const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (optional)
mongoose.connect('mongodb://127.0.0.1:27017/pos_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Product schema
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  quantity: Number,
  description: String,
});

const Product = mongoose.model('Product', productSchema);

// POST: create new product
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product' });
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