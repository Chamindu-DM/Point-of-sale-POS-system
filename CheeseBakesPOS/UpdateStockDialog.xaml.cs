using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
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

namespace CheeseBakesPOS
{
    /// <summary>
    /// Interaction logic for UpdateStockDialog.xaml
    /// </summary>
    public partial class UpdateStockDialog : Window
    {
        public int NewStockLevel { get; private set; }
        
        public UpdateStockDialog(string productName, int currentStock)
        {
            InitializeComponent();
            
            ProductNameTextBlock.Text = productName;
            CurrentStockTextBlock.Text = currentStock.ToString();
            NewStockTextBox.Text = currentStock.ToString();
        }
        
        private void NumberValidationTextBox(object sender, TextCompositionEventArgs e)
        {
            // Allow only digits
            Regex regex = new Regex("[^0-9]+");
            e.Handled = regex.IsMatch(e.Text);
        }
        
        private void UpdateButton_Click(object sender, RoutedEventArgs e)
        {
            if (int.TryParse(NewStockTextBox.Text, out int stockLevel))
            {
                NewStockLevel = stockLevel;
                DialogResult = true;
                Close();
            }
            else
            {
                MessageBox.Show("Please enter a valid number for stock level.", 
                    "Invalid Input", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
        }
        
        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            DialogResult = false;
            Close();
        }
    }
}
