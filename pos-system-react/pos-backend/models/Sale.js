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
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    paidAmount: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Sale', saleSchema);