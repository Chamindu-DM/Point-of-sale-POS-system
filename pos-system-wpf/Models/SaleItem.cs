using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace CheeseBakesPOS.Models
{
    public class SaleItem : INotifyPropertyChanged
    {
        private int _id;
        private int _saleId;
        private int _productId;
        private string _productName;
        private decimal _price;
        private int _quantity;
        private decimal _total;

        [Key]
        public int Id
        {
            get { return _id; }
            set
            {
                _id = value;
                OnPropertyChanged(nameof(Id));
            }
        }

        public int SaleId
        {
            get { return _saleId; }
            set
            {
                _saleId = value;
                OnPropertyChanged(nameof(SaleId));
            }
        }

        public int ProductId
        {
            get { return _productId; }
            set
            {
                _productId = value;
                OnPropertyChanged(nameof(ProductId));
            }
        }

        [StringLength(100)]
        public string ProductName
        {
            get { return _productName; }
            set
            {
                _productName = value;
                OnPropertyChanged(nameof(ProductName));
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
        
        [ForeignKey("SaleId")]
        public virtual Sale Sale { get; set; }
        
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }

        public event PropertyChangedEventHandler PropertyChanged;

        protected void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}