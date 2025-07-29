const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/Campground');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: true, //Deprecated in Mongoose 6
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database connected!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    console.log("Campgrounds removed!");

    for (let i = 0; i < 50; i++) {
        const ramdom1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            title: `Campground ${sample(descriptors)} ${sample(places)}`,
            price: Math.floor(Math.random() * 20) + 10,
            description: 'This is a great campground.',
            location: `${cities[ramdom1000].city}, ${cities[ramdom1000].state}`,
        });
        await camp.save();
        console.log(`Campground ${i + 1} created!`);
    }
    console.log("All campgrounds created!");
};

seedDb().then(() => {
    mongoose.connection.close();
    console.log("Database connection closed!");
});