using CheeseBakesPOS.Data;
using CheeseBakesPOS.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;  // For StringBuilder
using System.Windows;
using System.Windows.Controls;

namespace CheeseBakesPOS
{
    /// <summary>
    /// Interaction logic for SalesWindow.xaml
    /// </summary>
    public partial class SalesWindow : Window
    {
        private ObservableCollection<Sale> _sales;
        private ApplicationDbContext _context;

        public ObservableCollection<Sale> Sales
        {
            get { return _sales; }
            set { _sales = value; }
        }

        public SalesWindow()
        {
            InitializeComponent();
            
            // Initialize the context and collection
            _context = new ApplicationDbContext();
            _sales = new ObservableCollection<Sale>();
            
            // Set the DataContext for binding
            DataContext = this;
            
            // Load sales data from database
            LoadSalesData();
        }

        private void LoadSalesData()
        {
            try
            {
                // Clear existing sales
                Sales.Clear();
                
                // Query sales from database, including related items
                var sales = _context.Sales
                    .Include(s => s.Items)
                    .OrderByDescending(s => s.SaleDate)
                    .ToList();
                
                // Add sales to observable collection
                foreach (var sale in sales)
                {
                    Sales.Add(sale);
                }
                
                // Update status
                StatusTextBlock.Text = $"Loaded {sales.Count} sales records";
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error loading sales data: {ex.Message}", 
                    "Database Error", MessageBoxButton.OK, MessageBoxImage.Error);
                StatusTextBlock.Text = "Error loading sales data";
            }
        }

        private void RefreshButton_Click(object sender, RoutedEventArgs e)
        {
            // Reload sales data
            LoadSalesData();
        }

        private void ViewSaleDetails_Click(object sender, RoutedEventArgs e)
        {
            // Get the selected sale
            var selectedSale = ((Button)sender).DataContext as Sale;
            
            if (selectedSale != null)
            {
                // Create a simple details dialog
                var details = new StringBuilder();
                details.AppendLine($"Sale ID: {selectedSale.Id}");
                details.AppendLine($"Date: {selectedSale.SaleDate}");
                details.AppendLine($"Total: Rs. {selectedSale.TotalAmount:F2}");
                details.AppendLine($"Payment: Rs. {selectedSale.PaymentAmount:F2}");
                details.AppendLine($"Change: Rs. {selectedSale.ChangeAmount:F2}");
                details.AppendLine();
                details.AppendLine("Items:");
                
                foreach (var item in selectedSale.Items)
                {
                    details.AppendLine($"- {item.ProductName} x{item.Quantity} @ Rs.{item.Price:F2} = Rs.{item.Total:F2}");
                }
                
                MessageBox.Show(details.ToString(), "Sale Details", MessageBoxButton.OK);
            }
        }
    }
}
