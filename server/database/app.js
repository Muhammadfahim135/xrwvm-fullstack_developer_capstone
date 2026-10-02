const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const  cors = require('cors')
const app = express()
const port = 3030;

app.use(cors())
app.use(require('body-parser').urlencoded({ extended: false }));

const path = require('path');
const reviews_file = fs.existsSync("reviews.json") ? "reviews.json" : path.join(__dirname, "data", "reviews.json");
const dealerships_file = fs.existsSync("dealerships.json") ? "dealerships.json" : path.join(__dirname, "data", "dealerships.json");

const reviews_data = JSON.parse(fs.readFileSync(reviews_file, 'utf8'));
const dealerships_data = JSON.parse(fs.readFileSync(dealerships_file, 'utf8'));

const mongo_url = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/";
mongoose.connect(mongo_url, {'dbName':'dealershipsDB'}).then(async () => {
  console.log("Connected to MongoDB at " + mongo_url);
  try {
    await Reviews.deleteMany({});
    await Reviews.insertMany(reviews_data['reviews']);
    console.log("Seeded " + reviews_data['reviews'].length + " reviews");

    await Dealerships.deleteMany({});
    await Dealerships.insertMany(dealerships_data['dealerships']);
    console.log("Seeded " + dealerships_data['dealerships'].length + " dealerships");
  } catch (err) {
    console.log("Error seeding data:", err.message);
  }
}).catch(err => {
  console.log("Could not connect to MongoDB:", err.message);
});


const Reviews = require('./review');

const Dealerships = require('./dealership');



// Express route to home
app.get('/', async (req, res) => {
    res.send("Welcome to the Mongoose API")
});

// Express route to fetch all reviews
app.get('/fetchReviews', async (req, res) => {
  try {
    const documents = await Reviews.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch reviews by a particular dealer
app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const documents = await Reviews.find({dealership: req.params.id});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch all dealerships
app.get('/fetchDealers', async (req, res) => {
  try {
    const documents = await Dealerships.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch Dealers by a particular state
app.get('/fetchDealers/:state', async (req, res) => {
  try {
    const stateQuery = req.params.state;
    const documents = await Dealerships.find({
      $or: [
        { state: { $regex: new RegExp("^" + stateQuery + "$", "i") } },
        { st: { $regex: new RegExp("^" + stateQuery + "$", "i") } }
      ]
    });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch dealer by a particular id
app.get('/fetchDealer/:id', async (req, res) => {
  try {
    const documents = await Dealerships.find({ id: parseInt(req.params.id) });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});


//Express route to insert review
app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
  data = JSON.parse(req.body);
  const documents = await Reviews.find().sort( { id: -1 } )
  let new_id = documents[0]['id']+1

  const review = new Reviews({
		"id": new_id,
		"name": data['name'],
		"dealership": data['dealership'],
		"review": data['review'],
		"purchase": data['purchase'],
		"purchase_date": data['purchase_date'],
		"car_make": data['car_make'],
		"car_model": data['car_model'],
		"car_year": data['car_year'],
	});

  try {
    const savedReview = await review.save();
    res.json(savedReview);
  } catch (error) {
		console.log(error);
    res.status(500).json({ error: 'Error inserting review' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
