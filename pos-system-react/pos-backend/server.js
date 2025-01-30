const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

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

// Orders
app.get('/api/orders', (req, res) => {
    res.json([{ id: 1, items: [] }]);
});

// Sales
app.get('/api/sales', (req, res) => {
    res.json([{ saleId: 101, total: 1000 }]);
});

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));