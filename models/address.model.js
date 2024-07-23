const mongoose = require('mongoose');
const schema = mongoose.Schema;

const addressSchema = new schema({
    name: {
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
    stateUTCode: {
        type: String,
        required: true
    }
})


module.exports = addressSchema;