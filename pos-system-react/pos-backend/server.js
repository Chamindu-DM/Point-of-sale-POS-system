const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Sale = require('./models/Sale');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/pos_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  quantity: Number,
  description: String,
  imageUrl: String
});

const Product = mongoose.model('Product', productSchema);

// Routes
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const newProduct = new Product({
      ...req.body,
      imageUrl: imageUrl
    });
    await newProduct.save();
    res.json({ success: true, product: newProduct });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to add product' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    console.log('Products fetched:', products); // Debug log
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: err.message });
  }
});

// Update the delete endpoint
app.delete('/api/products/:id', async (req, res) => {
    try {
        console.log('Attempting to delete product with ID:', req.params.id); // Debug log
        
        const result = await Product.findByIdAndDelete(req.params.id);
        
        if (!result) {
            console.log('Product not found'); // Debug log
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        
        console.log('Product deleted successfully:', result); // Debug log
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// Add an update endpoint for editing products
app.put('/api/products/:id', upload.single('image'), async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.imageUrl = `/uploads/${req.file.filename}`;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, product: updatedProduct });
    } catch (err) {
        console.error('Update error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// Orders
app.get('/api/orders', (req, res) => {
    res.json([{ id: 1, items: [] }]);
});

// Sales
app.get('/api/sales', async (req, res) => {
    try {
        const { startDate, endDate, page = 1, limit = 10 } = req.query;
        let query = {};

        if (startDate && endDate) {
            query.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const sales = await Sale.find(query)
            .sort({ date: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Sale.countDocuments(query);

        const summary = await Sale.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$total" },
                    totalTransactions: { $sum: 1 }
                }
            }
        ]);

        res.json({
            sales,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            summary: summary[0] || { totalSales: 0, totalTransactions: 0 }
        });
    } catch (err) {
        console.error('Error fetching sales:', err);
        res.status(500).json({ message: err.message });
    }
});

// Add new sale
app.post('/api/sales', async (req, res) => {
    try {
        // Get the last invoice number
        const lastSale = await Sale.findOne().sort({ invoiceNumber: -1 });
        const invoiceNumber = lastSale ? lastSale.invoiceNumber + 1 : 1000;

        const newSale = new Sale({
            ...req.body,
            invoiceNumber,
            date: new Date()
        });

        const savedSale = await newSale.save();
        res.status(201).json(savedSale);
    } catch (err) {
        console.error('Error creating sale:', err);
        res.status(400).json({ message: err.message });
    }
});

// Get sale by invoice number
app.get('/api/sales/:invoiceNumber', async (req, res) => {
    try {
        const sale = await Sale.findOne({ invoiceNumber: req.params.invoiceNumber });
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.json(sale);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get sales summary
app.get('/api/sales/summary', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        let query = {};

        if (startDate && endDate) {
            query.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const summary = await Sale.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$total" },
                    totalTransactions: { $sum: 1 },
                    averageTransaction: { $avg: "$total" }
                }
            }
        ]);

        res.json(summary[0] || {
            totalSales: 0,
            totalTransactions: 0,
            averageTransaction: 0
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));