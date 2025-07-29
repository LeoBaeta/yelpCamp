const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String,
});

module.exports = mongoose.model('Campground', CampgroundSchema, 'campsites');
// 'campsites' is the collection name in MongoDB
// Note: The third parameter 'campsites' is optional; if not provided, Mongoose will use the pluralized version of the model name ('Campground' -> 'campgrounds')

// To check this in the MongoDB:
// - run mongo shell (mongosh)
// - use yelp-camp
// - db.campgrounds.find().pretty()