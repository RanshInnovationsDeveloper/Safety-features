const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    name: {
        type: String
    },
    address: {
        type: String,
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
    expiration: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    active:{
        type: Date,
        default: Date.now
    },
    author:{
        type: String,
        required: true,
    }
});


const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;
