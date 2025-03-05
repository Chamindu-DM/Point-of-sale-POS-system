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

namespace CheeseBakesPOS
{
    /// <summary>
    /// Interaction logic for InventoryWindow.xaml
    /// </summary>
    public partial class InventoryWindow : Window
    {
        public InventoryWindow()
        {
            InitializeComponent();
            // TODO: Load inventory data from database
        }
        
        private void CategoryFilter_Changed(object sender, SelectionChangedEventArgs e)
        {
            // Filter inventory items based on selected category
            string selectedCategory = ((ComboBoxItem)((ComboBox)sender).SelectedItem).Content.ToString();
            // TODO: Apply filter
        }
        
        private void UpdateInventory_Click(object sender, RoutedEventArgs e)
        {
            // Batch update inventory
            MessageBox.Show("Inventory updated successfully!", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
        }
    }
}
