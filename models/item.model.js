const mongoose = require('mongoose');
const schema = mongoose.Schema;

const itemSchema = new schema({
    description: {
        type: String,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    netAmount: {
        type: Number,
        required: true
    },
    taxRate: {
        type: Number,
        required: true,
        default: 18 
    }
});

module.exports = itemSchema;