const mongoose = require('mongoose');
const placeSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    address:String,
    description: String,
    // When you're setting the photos field, 
    //ensure you're assigning an array of strings directly.
    // It should not be a string or a nested array.
    photos:[''], //Make sure dont forget to put those two semicolons for it to be interpreted as an array
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price: Number,

});

const PlaceModel = mongoose.model('Place' ,placeSchema);
module.exports = PlaceModel;