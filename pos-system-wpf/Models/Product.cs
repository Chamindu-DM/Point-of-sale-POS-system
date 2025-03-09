using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace CheeseBakesPOS.Models
{
    public class Product : INotifyPropertyChanged
    {
        private int _id;
        private string _name;
        private string _category;
        private decimal _price;
        private int _inStock;
        private string _imageSource;

        public event PropertyChangedEventHandler PropertyChanged;

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

        [Required]
        [StringLength(100)]
        public string Name
        {
            get { return _name; }
            set
            {
                _name = value;
                OnPropertyChanged(nameof(Name));
            }
        }
        
        [StringLength(50)]
        public string Category
        {
            get { return _category; }
            set
            {
                _category = value;
                OnPropertyChanged(nameof(Category));
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

        [StringLength(255)]
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
}