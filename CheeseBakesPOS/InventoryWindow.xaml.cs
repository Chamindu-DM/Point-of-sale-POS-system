using CheeseBakesPOS.Data;
using CheeseBakesPOS.Models;
using System;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace CheeseBakesPOS
{
    public partial class InventoryWindow : Window
    {
        private ObservableCollection<InventoryItem> _inventoryItems;
        
        public InventoryWindow()
        {
            InitializeComponent();
            _inventoryItems = new ObservableCollection<InventoryItem>();
            InventoryDataGrid.ItemsSource = _inventoryItems;
            
            // Load inventory data
            LoadInventory();
        }
        
        private void LoadInventory()
        {
            try
            {
                using (var context = new ApplicationDbContext())
                {
                    // Get products from database
                    var products = context.Products.ToList();
                    
                    // Clear existing items
                    _inventoryItems.Clear();
                    
                    // Populate the inventory items
                    foreach (var product in products)
                    {
                        var item = new InventoryItem
                        {
                            Id = product.Id,
                            Name = product.Name,
                            Category = product.Category,
                            InStock = product.InStock,
                            Price = product.Price,
                        };
                        
                        // Calculate status and color
                        if (item.InStock <= 0)
                        {
                            item.Status = "Out of Stock";
                            item.StatusColor = new SolidColorBrush(Colors.Red);
                        }
                        else if (item.InStock < 5) // Low stock threshold
                        {
                            item.Status = "Low Stock";
                            item.StatusColor = new SolidColorBrush(Colors.Orange);
                        }
                        else
                        {
                            item.Status = "In Stock";
                            item.StatusColor = new SolidColorBrush(Colors.Green);
                        }
                        
                        _inventoryItems.Add(item);
                    }
                    
                    // Update categories in dropdown
                    UpdateCategoryComboBox(products.Select(p => p.Category).Distinct().ToList());
                    
                    StatusTextBlock.Text = $"Loaded {products.Count} products";
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error loading inventory: {ex.Message}", 
                    "Database Error", MessageBoxButton.OK, MessageBoxImage.Error);
                StatusTextBlock.Text = "Error loading inventory";
            }
        }
        
        private void UpdateCategoryComboBox(System.Collections.Generic.List<string> categories)
        {
            // Clear and add "All Categories"
            CategoryComboBox.Items.Clear();
            CategoryComboBox.Items.Add("All Categories");
            
            // Add each category
            foreach (var category in categories.OrderBy(c => c))
            {
                CategoryComboBox.Items.Add(category);
            }
            
            // Select the first item
            CategoryComboBox.SelectedIndex = 0;
        }
        
        private void CategoryFilter_Changed(object sender, SelectionChangedEventArgs e)
        {
            if (CategoryComboBox.SelectedItem == null) return;
            
            string selectedCategory = CategoryComboBox.SelectedItem.ToString();
            
            // Filter products based on selected category
            if (selectedCategory == "All Categories")
            {
                InventoryDataGrid.ItemsSource = _inventoryItems;
            }
            else
            {
                var filteredItems = new ObservableCollection<InventoryItem>(
                    _inventoryItems.Where(item => item.Category == selectedCategory)
                );
                InventoryDataGrid.ItemsSource = filteredItems;
            }
            
            StatusTextBlock.Text = $"Showing {(InventoryDataGrid.ItemsSource as ObservableCollection<InventoryItem>).Count} products";
        }
        
        private void RefreshInventory_Click(object sender, RoutedEventArgs e)
        {
            LoadInventory();
        }
        
        private void UpdateStock_Click(object sender, RoutedEventArgs e)
        {
            var button = sender as Button;
            var item = button?.DataContext as InventoryItem;
            
            if (item != null)
            {
                // Show simple input dialog
                string input = Microsoft.VisualBasic.Interaction.InputBox(
                    $"Enter new stock level for {item.Name}:", 
                    "Update Stock", 
                    item.InStock.ToString());
                
                // Process the input
                if (!string.IsNullOrEmpty(input) && int.TryParse(input, out int newStock) && newStock >= 0)
                {
                    try
                    {
                        using (var context = new ApplicationDbContext())
                        {
                            // Find and update the product
                            var product = context.Products.Find(item.Id);
                            if (product != null)
                            {
                                product.InStock = newStock;
                                context.SaveChanges();
                                
                                // Update the UI item
                                item.InStock = newStock;
                                
                                // Update status and color
                                if (newStock <= 0)
                                {
                                    item.Status = "Out of Stock";
                                    item.StatusColor = new SolidColorBrush(Colors.Red);
                                }
                                else if (newStock < 5)
                                {
                                    item.Status = "Low Stock";
                                    item.StatusColor = new SolidColorBrush(Colors.Orange);
                                }
                                else
                                {
                                    item.Status = "In Stock";
                                    item.StatusColor = new SolidColorBrush(Colors.Green);
                                }
                                
                                StatusTextBlock.Text = $"Updated stock for {item.Name}";
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show($"Error updating stock: {ex.Message}", 
                            "Database Error", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
                else if (!string.IsNullOrEmpty(input))
                {
                    MessageBox.Show("Please enter a valid positive number.", 
                        "Invalid Input", MessageBoxButton.OK, MessageBoxImage.Warning);
                }
            }
        }
    }
    
    // InventoryItem class
    public class InventoryItem : INotifyPropertyChanged
    {
        private int _id;
        private string _name;
        private string _category;
        private int _inStock;
        private decimal _price;
        private string _status;
        private Brush _statusColor;
        
        public int Id
        {
            get { return _id; }
            set
            {
                _id = value;
                OnPropertyChanged(nameof(Id));
            }
        }
        
        public string Name
        {
            get { return _name; }
            set
            {
                _name = value;
                OnPropertyChanged(nameof(Name));
            }
        }
        
        public string Category
        {
            get { return _category; }
            set
            {
                _category = value;
                OnPropertyChanged(nameof(Category));
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
        
        public decimal Price
        {
            get { return _price; }
            set
            {
                _price = value;
                OnPropertyChanged(nameof(Price));
            }
        }
        
        public string Status
        {
            get { return _status; }
            set
            {
                _status = value;
                OnPropertyChanged(nameof(Status));
            }
        }
        
        public Brush StatusColor
        {
            get { return _statusColor; }
            set
            {
                _statusColor = value;
                OnPropertyChanged(nameof(StatusColor));
            }
        }
        
        public event PropertyChangedEventHandler PropertyChanged;
        
        protected void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
