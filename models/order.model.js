const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderSchema = new schema({
    orderNo: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    }
})

module.exports = orderSchema;