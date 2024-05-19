const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    Orderpassword: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
/*,OrderStatus: {
        type: String,
        required: true
    },
    OrderAction:{
        type: String,
        required: true
    },*/,
     customerId: {
         type: String,
        default: function() {
            return this._id.toString();
         }
     },
    
     
});

module.exports = mongoose.model('User', userSchema);
