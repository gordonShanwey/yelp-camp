
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp'/*, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}*/);

const db = mongoose.connection;
db.on("error", console.error.bind(console.error, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61ca151c870aef0b5236ccc1',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/shanwey/image/upload/v1640817895/YelpCamp/iy9duetonbi5ckg79tew.jpg',
                    filename: 'YelpCamp/iy9duetonbi5ckg79tew',
                },
                {
                    url: 'https://res.cloudinary.com/shanwey/image/upload/v1640816311/YelpCamp/qf1kswzda9rzoqk5ptnr.jpg',
                    filename: 'YelpCamp/qf1kswzda9rzoqk5ptnr',
                }
            ],
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum voluptates neque ullam facere vitae veniam aspernatur rem ipsam libero inventore impedit cumque, placeat dolorem, unde iste assumenda. Nobis, omnis ipsa.",
            price: 10
        })
        await camp.save();
    }
}
//console.log(places[0]);
seedDB().then(() => {
    mongoose.connection.close();
})