const mongoose = require('mongoose');
const schema = mongoose.Schema;

const sellerSchema = new schema({
    sellerId: {
        type: String,
        required: true,
        unique: true
    },
    sellerName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    panNo: {
        type: String,
        required: true
    },
    GSTRegistrationNo: {
        type: String,
        required: true
    },
    placeofsupply: {
        type: String,
        required: true
    },
    signature:{
        type:String,
        required:true
    }
});

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
