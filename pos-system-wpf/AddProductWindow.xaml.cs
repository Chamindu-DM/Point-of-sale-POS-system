using System;
using System.Windows;
using System.Windows.Controls;
using Microsoft.Win32;
using System.Windows.Media.Imaging;
using CheeseBakesPOS.Models;
using CheeseBakesPOS.Data;

namespace CheeseBakesPOS
{
    /// <summary>
    /// Interaction logic for AddProductWindow.xaml
    /// </summary>
    public partial class AddProductWindow : Window
    {
        private Product _product;
        private bool _isEditMode = false;

        public AddProductWindow()
        {
            InitializeComponent();
            _product = new Product();
        }

        // Constructor for editing an existing product
        public AddProductWindow(Product product) : this()
        {
            _product = product;
            _isEditMode = true;
            
            // Populate the form with product data
            ProductNameTextBox.Text = product.Name;
            CategoryComboBox.Text = product.Category;
            PriceTextBox.Text = product.Price.ToString();
            StockTextBox.Text = product.InStock.ToString();
            ImagePathTextBox.Text = product.ImageSource;
            
            // Update UI to show we're editing
            Title = "Edit Product";
            SaveButton.Content = "Update";
            
            // Try to load the image if available
            if (!string.IsNullOrEmpty(product.ImageSource))
            {
                try
                {
                    ProductImage.Source = new BitmapImage(new Uri(product.ImageSource, UriKind.RelativeOrAbsolute));
                }
                catch { /* Ignore if image can't be loaded */ }
            }
        }
        
        private void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(ProductNameTextBox.Text))
            {
                MessageBox.Show("Please enter a product name.", "Validation Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            if (!decimal.TryParse(PriceTextBox.Text, out decimal price) || price <= 0)
            {
                MessageBox.Show("Please enter a valid price.", "Validation Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            if (!int.TryParse(StockTextBox.Text, out int stock) || stock < 0)
            {
                MessageBox.Show("Please enter a valid stock quantity.", "Validation Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            // Update product properties
            _product.Name = ProductNameTextBox.Text;
            _product.Category = CategoryComboBox.Text;
            _product.Price = price;
            _product.InStock = stock;
            _product.ImageSource = ImagePathTextBox.Text;

            // Save to database
            try
            {
                using (var context = new ApplicationDbContext())
                {
                    if (_isEditMode)
                    {
                        context.Products.Update(_product);
                    }
                    else
                    {
                        context.Products.Add(_product);
                    }
                    context.SaveChanges();
                }
                
                MessageBox.Show(_isEditMode 
                    ? "Product updated successfully!" 
                    : "Product added successfully!", 
                    "Success", MessageBoxButton.OK, MessageBoxImage.Information);
                    
                DialogResult = true;
                Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error saving product: {ex.Message}", 
                    "Database Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
        
        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            DialogResult = false;
            Close();
        }
        
        private void BrowseButton_Click(object sender, RoutedEventArgs e)
        {
            var openFileDialog = new OpenFileDialog
            {
                Title = "Select Product Image",
                Filter = "Image files (*.jpg, *.jpeg, *.png) | *.jpg; *.jpeg; *.png"
            };
            
            if (openFileDialog.ShowDialog() == true)
            {
                ImagePathTextBox.Text = openFileDialog.FileName;
                
                // Display the selected image
                try
                {
                    ProductImage.Source = new BitmapImage(new Uri(openFileDialog.FileName));
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Error loading image: {ex.Message}", 
                        "Image Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }
    }
}
