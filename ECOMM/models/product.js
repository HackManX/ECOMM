const mongoose = require('mongoose');

const product = new mongoose.Schema({
    name: {
        type: String,
        
    },
    totalamount: {
        type: Number,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    paymentmethod: {
        type: String,
       
    },
    address:{
        type:String
    }
});


module.exports = mongoose.model('product',product);
