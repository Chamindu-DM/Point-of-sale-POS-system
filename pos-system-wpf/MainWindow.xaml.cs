using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using CheeseBakesPOS.Data;
using CheeseBakesPOS.Models;
using Microsoft.EntityFrameworkCore; // Add this for ToListAsync and other EF Core methods

namespace CheeseBakesPOS
{
    public partial class MainWindow : Window, INotifyPropertyChanged
    {
        private ObservableCollection<Product> _products;
        private ObservableCollection<CartItem> _cartItems;
        private decimal _totalAmount;

        public event PropertyChangedEventHandler PropertyChanged;

        public ObservableCollection<Product> Products
        {
            get { return _products; }
            set
            {
                _products = value;
                OnPropertyChanged(nameof(Products));
            }
        }

        public ObservableCollection<CartItem> CartItems
        {
            get { return _cartItems; }
            set
            {
                _cartItems = value;
                OnPropertyChanged(nameof(CartItems));
            }
        }

        public decimal TotalAmount
        {
            get { return _totalAmount; }
            set
            {
                _totalAmount = value;
                OnPropertyChanged(nameof(TotalAmount));
            }
        }

        public MainWindow()
        {
            InitializeComponent();
            DataContext = this;

            // Initialize collections
            Products = new ObservableCollection<Product>();
            CartItems = new ObservableCollection<CartItem>();

            // Initialize database and load products
            InitializeDatabaseAsync();
        }

        private async void InitializeDatabaseAsync()
        {
            try
            {
                using (var context = new ApplicationDbContext())
                {
                    // Ensure database is created
                    await context.Database.EnsureCreatedAsync();

                    // Check if we need to add sample data
                    if (!context.Products.Any())
                    {
                        // Add sample products
                        context.Products.AddRange(
                            new Product
                            {
                                Name = "Tea Bun",
                                Category = "Buns",
                                Price = 50.00m,
                                InStock = 12,
                                ImageSource = "/Images/tea_bun.jpg"
                            },
                            new Product
                            {
                                Name = "Fish Bun",
                                Category = "Buns",
                                Price = 70.00m,
                                InStock = 12,
                                ImageSource = "/Images/fish_bun.jpg"
                            },
                            new Product
                            {
                                Name = "Chicken Puff",
                                Category = "Pastries", 
                                Price = 250.00m,
                                InStock = 12,
                                ImageSource = "/Images/Chicken Puff.jpeg"
                            }
                        );
                        await context.SaveChangesAsync();
                    }

                    // Load products from database
                    var products = await context.Products.ToListAsync();
                    Products.Clear();
                    foreach (var product in products)
                    {
                        Products.Add(product);
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Database initialization error: {ex.Message}\n{ex.StackTrace}", 
                    "Database Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        protected void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        private void AddToCart_Click(object sender, RoutedEventArgs e)
        {
            Button button = sender as Button;
            Product product = button.DataContext as Product;

            // Check if item already exists in cart
            CartItem existingItem = CartItems.FirstOrDefault(c => c.Name == product.Name);

            if (existingItem != null)
            {
                existingItem.Quantity++;
                existingItem.Total = existingItem.Price * existingItem.Quantity;
            }
            else
            {
                CartItems.Add(new CartItem
                {
                    Name = product.Name,
                    Price = product.Price,
                    Quantity = 1,
                    Total = product.Price
                });
            }

            // Update total amount
            CalculateTotalAmount();
        }

        private void CalculateTotalAmount()
        {
            decimal total = 0;
            foreach (var item in CartItems)
            {
                total += item.Total;
            }
            TotalAmount = total;
        }

        private void IncreaseQuantity_Click(object sender, RoutedEventArgs e)
        {
            Button button = sender as Button;
            CartItem item = button.DataContext as CartItem;

            item.Quantity++;
            item.Total = item.Price * item.Quantity;
            CalculateTotalAmount();
        }

        private void DecreaseQuantity_Click(object sender, RoutedEventArgs e)
        {
            Button button = sender as Button;
            CartItem item = button.DataContext as CartItem;

            if (item.Quantity > 1)
            {
                item.Quantity--;
                item.Total = item.Price * item.Quantity;
                CalculateTotalAmount();
            }
        }

        private void RemoveFromCart_Click(object sender, RoutedEventArgs e)
        {
            Button button = sender as Button;
            CartItem item = button.DataContext as CartItem;

            CartItems.Remove(item);
            CalculateTotalAmount();
        }

        private async void Checkout_Click(object sender, RoutedEventArgs e)
        {
            // Get the payment amount
            decimal paymentAmount;
            if (!decimal.TryParse(PaymentTextBox.Text, out paymentAmount) || paymentAmount < TotalAmount)
            {
                MessageBox.Show("Please enter a valid payment amount equal to or greater than the total.", "Invalid Payment", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            var changeAmount = paymentAmount - TotalAmount;

            try
            {
                using (var context = new ApplicationDbContext())
                {
                    // Create and populate the sale
                    var sale = new Sale
                    {
                        SaleDate = DateTime.Now,
                        TotalAmount = TotalAmount,
                        PaymentAmount = paymentAmount,
                        ChangeAmount = changeAmount,
                        Items = new List<SaleItem>()
                    };

                    // Process each cart item
                    foreach (var cartItem in CartItems)
                    {
                        // Update product inventory
                        var product = context.Products.FirstOrDefault(p => p.Name == cartItem.Name);
                        if (product != null)
                        {
                            product.InStock -= cartItem.Quantity;
                        }
                        
                        // Add to sale items
                        sale.Items.Add(new SaleItem
                        {
                            ProductId = product?.Id ?? 0,
                            ProductName = cartItem.Name,
                            Price = cartItem.Price,
                            Quantity = cartItem.Quantity,
                            Total = cartItem.Total
                        });
                    }

                    // Add to database and save
                    context.Sales.Add(sale);
                    await context.SaveChangesAsync();

                    // Show success message
                    MessageBox.Show($"Sale completed!\n\nTotal: ${TotalAmount:F2}\nPayment: ${paymentAmount:F2}\nChange: ${changeAmount:F2}", 
                        "Checkout Complete", MessageBoxButton.OK, MessageBoxImage.Information);
                    
                    // Clear the cart
                    CartItems.Clear();
                    CalculateTotalAmount();
                    PaymentTextBox.Text = string.Empty;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error saving sale: {ex.Message}", "Database Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        // Helper method to get product ID from name
        private int GetProductId(string productName)
        {
            using (var context = new ApplicationDbContext())
            {
                var product = context.Products.FirstOrDefault(p => p.Name == productName);
                return product?.Id ?? 0;
            }
        }

        private void SalesButton_Click(object sender, RoutedEventArgs e)
        {
            // Actually create and show the Sales window
            var salesWindow = new SalesWindow();
            salesWindow.Show();
            SetActiveButton(sender);
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            // Implement other button functionality
        }

        private void DashboardButton_Click(object sender, RoutedEventArgs e)
        {
            // This is the main window, so just make sure it's visible
            // If you have a content frame, you could navigate to the dashboard view
            SetActiveButton(sender);
        }

        private void ViewProductsButton_Click(object sender, RoutedEventArgs e)
        {
            // Create and show Products window
            var productsWindow = new ProductsWindow();
            productsWindow.Show();
            SetActiveButton(sender);
        }

        private void AddProductButton_Click(object sender, RoutedEventArgs e)
        {
            // Create and show Add Product dialog
            var addProductDialog = new AddProductWindow();
            addProductDialog.ShowDialog(); // Use ShowDialog for modal windows
        }

        private void InventoryButton_Click(object sender, RoutedEventArgs e)
        {
            // Create and show Inventory window
            var inventoryWindow = new InventoryWindow();
            inventoryWindow.Show();
            SetActiveButton(sender);
        }

        // Helper method to highlight the active button
        private void SetActiveButton(object sender)
        {
            // Get the sidebar StackPanel which contains all menu items
            var sidebarPanel = FindName("SidebarPanel") as StackPanel;
            if (sidebarPanel == null) return;
            
            // Reset all buttons to default style
            foreach (var child in sidebarPanel.Children)
            {
                if (child is Button sidebarButton)
                {
                    // Changed variable name from 'button' to 'sidebarButton'
                    sidebarButton.Foreground = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#888888"));
                    sidebarButton.FontWeight = FontWeights.Normal;
                }
                else if (child is Border border)
                {
                    var borderButton = border.Child as Button; // Changed from 'button' to 'borderButton'
                    if (borderButton != null)
                    {
                        borderButton.Foreground = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#888888"));
                        borderButton.FontWeight = FontWeights.Normal;
                    }
                    border.Background = Brushes.Transparent;
                    border.BorderThickness = new Thickness(0);
                }
                else if (child is StackPanel stackPanel)
                {
                    // For expandable menu items
                    foreach (var expander in stackPanel.Children)
                    {
                        if (expander is Expander exp)
                        {
                            foreach (var expanderChild in ((StackPanel)exp.Content).Children)
                            {
                                if (expanderChild is Button expanderButton)
                                {
                                    expanderButton.Foreground = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#888888"));
                                    expanderButton.FontWeight = FontWeights.Normal;
                                }
                            }
                        }
                    }
                }
            }

            // Set active style for clicked button
            if (sender is Button clickedButton)
            {
                clickedButton.Foreground = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#3E91FF"));
                clickedButton.FontWeight = FontWeights.SemiBold;
                
                // If the button is inside a border, style the border
                if (clickedButton.Parent is Border border)
                {
                    border.Background = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#ECF4FF"));
                    border.BorderThickness = new Thickness(5, 0, 0, 0);
                    border.BorderBrush = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#3E91FF"));
                }
            }
        }
    }

    public class CartItem : INotifyPropertyChanged
    {
        private string _name;
        private decimal _price;
        private int _quantity;
        private decimal _total;

        public event PropertyChangedEventHandler PropertyChanged;

        public string Name
        {
            get { return _name; }
            set
            {
                _name = value;
                OnPropertyChanged(nameof(Name));
            }
        }

        public decimal Price
        {
            get { return _price; }
            set
            {
                _price = value;
                OnPropertyChanged(nameof(Price));
            }
        }

        public int Quantity
        {
            get { return _quantity; }
            set
            {
                _quantity = value;
                OnPropertyChanged(nameof(Quantity));
                // Recalculate Total when Quantity changes
                Total = Price * Quantity;
            }
        }

        public decimal Total
        {
            get { return _total; }
            set
            {
                _total = value;
                OnPropertyChanged(nameof(Total));
            }
        }

        protected void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }

}