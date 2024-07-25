const mongoose = require('mongoose');
const addressSchema = require('./address.model');
const orderSchema = require('./order.model');
const itemSchema = require('./item.model');
const schema = mongoose.Schema;

const invoiceDetailSchema = new schema({
    invoiceNo: {
        type: String,
        required: true
    },
    invoiceDate: {
        type: Date,
        required: true
    },
    invoiceDetails: {
        type: String,
        required: false
    },
    reverseCharge: {
        type: String,
        required: false,
    }
});

const invoiceFullSchema = new schema({
    seller:{
        type:schema.Types.ObjectId,
        ref:'Seller',
        required:false
    },
    companylogo:{
       type:String,
       required:false
    },
    billingDetails: {
        type: addressSchema,
        required: false
    },
    shippingDetails: {
        type: addressSchema,
        required: false
    },
    placeOfDelivery: {
        type: String,
        required: true
    },
    orderDetails: {
        type: orderSchema,
        required: false
    },
    invoiceDetails: {
        type: invoiceDetailSchema,
        required: false
    },
    items: {
        type: [itemSchema],
        required: true
    }
})

invoiceFullSchema.pre('findOne',function(next){
    this.populate('seller');
    next();
})

const Invoice = mongoose.model("Invoice",invoiceFullSchema);

module.exports = Invoice;