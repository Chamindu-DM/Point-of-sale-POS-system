using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CheeseBakesPOS.Models
{
    public class Sale : INotifyPropertyChanged
    {
        public Sale()
        {
            Items = new List<SaleItem>();
        }

        private int _id;
        private DateTime _saleDate;
        private decimal _totalAmount;
        private decimal _paymentAmount;
        private decimal _changeAmount;

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

        public DateTime SaleDate
        {
            get { return _saleDate; }
            set
            {
                _saleDate = value;
                OnPropertyChanged(nameof(SaleDate));
            }
        }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount
        {
            get { return _totalAmount; }
            set
            {
                _totalAmount = value;
                OnPropertyChanged(nameof(TotalAmount));
            }
        }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal PaymentAmount
        {
            get { return _paymentAmount; }
            set
            {
                _paymentAmount = value;
                OnPropertyChanged(nameof(PaymentAmount));
            }
        }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal ChangeAmount
        {
            get { return _changeAmount; }
            set
            {
                _changeAmount = value;
                OnPropertyChanged(nameof(ChangeAmount));
            }
        }

        public virtual ICollection<SaleItem> Items { get; set; }

        public event PropertyChangedEventHandler PropertyChanged;

        protected void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}