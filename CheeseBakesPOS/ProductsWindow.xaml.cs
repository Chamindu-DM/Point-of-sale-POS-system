using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Collections.ObjectModel;
using CheeseBakesPOS.Data;
using CheeseBakesPOS.Models;
using Microsoft.EntityFrameworkCore;

namespace CheeseBakesPOS
{
    /// <summary>
    /// Interaction logic for ProductsWindow.xaml
    /// </summary>
    public partial class ProductsWindow : Window
    {
        private ObservableCollection<Product> _products;
        
        public ProductsWindow()
        {
            InitializeComponent();
            _products = new ObservableCollection<Product>();
            ProductsDataGrid.ItemsSource = _products;
            
            // Load products when window opens
            LoadProducts();
        }
        
        private void LoadProducts()
        {
            try
            {
                using (var context = new ApplicationDbContext())
                {
                    var products = context.Products.ToList();
                    _products.Clear();
                    
                    foreach (var product in products)
                    {
                        _products.Add(product);
                    }
                    
                    StatusText.Text = $"{products.Count} products loaded";
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error loading products: {ex.Message}", 
                    "Database Error", MessageBoxButton.OK, MessageBoxImage.Error);
                StatusText.Text = "Error loading products";
            }
        }
        
        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
            var addProductWindow = new AddProductWindow();
            addProductWindow.Owner = this;
            
            if (addProductWindow.ShowDialog() == true)
            {
                // Reload products after adding
                LoadProducts();
            }
        }
        
        private void EditButton_Click(object sender, RoutedEventArgs e)
        {
            if (ProductsDataGrid.SelectedItem is Product selectedProduct)
            {
                var editProductWindow = new AddProductWindow(selectedProduct);
                editProductWindow.Owner = this;
                
                if (editProductWindow.ShowDialog() == true)
                {
                    // Reload products after editing
                    LoadProducts();
                }
            }
            else
            {
                MessageBox.Show("Please select a product to edit.", 
                    "Selection Required", MessageBoxButton.OK, MessageBoxImage.Information);
            }
        }
        
        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            if (ProductsDataGrid.SelectedItem is Product selectedProduct)
            {
                var result = MessageBox.Show($"Are you sure you want to delete {selectedProduct.Name}?", 
                    "Confirm Delete", MessageBoxButton.YesNo, MessageBoxImage.Question);
                    
                if (result == MessageBoxResult.Yes)
                {
                    try
                    {
                        using (var context = new ApplicationDbContext())
                        {
                            context.Products.Remove(selectedProduct);
                            context.SaveChanges();
                            
                            // Reload products after deletion
                            LoadProducts();
                        }
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show($"Error deleting product: {ex.Message}", 
                            "Database Error", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
            }
            else
            {
                MessageBox.Show("Please select a product to delete.", 
                    "Selection Required", MessageBoxButton.OK, MessageBoxImage.Information);
            }
        }
        
        private void RefreshButton_Click(object sender, RoutedEventArgs e)
        {
            LoadProducts();
        }
    }
}
