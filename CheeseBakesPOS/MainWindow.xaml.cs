using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Media.Imaging;

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
            Products = new ObservableCollection<Product>
            {
                new Product
                {
                    Name = "Tea Bun",
                    Price = 50.00m,
                    InStock = 12,
                    ImageSource = "/Images/tea_bun.jpg"
                },
                new Product
                {
                    Name = "Fish Bun",
                    Price = 70.00m,
                    InStock = 12,
                    ImageSource = "/Images/fish_bun.jpg"
                },
                new Product
                {
                    Name = "Chicken Puff",
                    Price = 250.00m,
                    InStock = 12,
                    ImageSource = "/Images/Chicken Puff.jpeg"
                }
            };

            CartItems = new ObservableCollection<CartItem>();
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

        private void Checkout_Click(object sender, RoutedEventArgs e)
        {
            // Get the payment amount
            decimal paymentAmount;
            bool isValidPayment = decimal.TryParse(PaymentTextBox.Text, out paymentAmount);

            if (!isValidPayment)
            {
                MessageBox.Show("Please enter a valid payment amount.", "Invalid Payment", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            if (paymentAmount < TotalAmount)
            {
                MessageBox.Show("Payment amount is less than the total.", "Insufficient Payment", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            // Calculate change
            decimal change = paymentAmount - TotalAmount;

            // Show success message
            MessageBox.Show($"Payment successful!\nTotal: Rs. {TotalAmount:F2}\nPaid: Rs. {paymentAmount:F2}\nChange: Rs. {change:F2}",
                "Checkout Complete", MessageBoxButton.OK, MessageBoxImage.Information);

            // Clear cart
            CartItems.Clear();
            PaymentTextBox.Text = string.Empty;
            CalculateTotalAmount();
        }

        private void SalesButton_Click(object sender, RoutedEventArgs e)
        {
            // Implement Sales button functionality
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            // Implement other button functionality
        }
    }

    public class Product : INotifyPropertyChanged
    {
        private string _name;
        private decimal _price;
        private int _inStock;
        private string _imageSource;

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

        public int InStock
        {
            get { return _inStock; }
            set
            {
                _inStock = value;
                OnPropertyChanged(nameof(InStock));
            }
        }

        public string ImageSource
        {
            get { return _imageSource; }
            set
            {
                _imageSource = value;
                OnPropertyChanged(nameof(ImageSource));
            }
        }

        protected void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
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