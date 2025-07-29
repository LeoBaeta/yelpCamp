const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Campground = require('./models/Campground');

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

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({
        title: 'My First Campground',
        price: '20',
        description: 'This is a great campground.',
        location: 'Hillside',
    });
    await camp.save();
    res.send(camp);
});
// To check this in the MongoDB:
// - run mongo shell (mongosh)
// - use yelp-camp
// - db.campgrounds.find().pretty()


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});