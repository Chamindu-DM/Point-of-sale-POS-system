const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    items: [{
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        subtotal: Number
    }],
    total: Number,
    date: {
        type: Date,
        default: Date.now
    },
    paidAmount: Number,
    change: Number
});

module.exports = mongoose.model('Sale', SaleSchema);