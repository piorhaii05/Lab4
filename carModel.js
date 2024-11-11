const mongoose = require('mongoose');
const CarSchema = new mongoose.Schema({
    ten:{
        type: String,
        require: true
    },
    nam:{
        type: Number
    },
    hang:{
        type: String,
        require: true
    },
    gia:{
        type: Number
    },

});
const CarModel = new mongoose.model('car', CarSchema);

module.exports = CarModel;