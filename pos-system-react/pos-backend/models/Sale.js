const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    invoiceNumber: {
        type: Number,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    items: [{
        _id: String,
        name: String,
        quantity: Number,
        price: Number
    }],
    total: Number,
    paidAmount: Number,
    balance: Number
});

module.exports = mongoose.model('Sale', saleSchema);