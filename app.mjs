import './config.mjs';
import './db.mjs'; // Make sure db.mjs is executed

import mongoose from 'mongoose';
const Review = mongoose.model('Review'); // Retrieving the model


import express from 'express';
const app = express();

// set up express static
import url from 'url';
import path from 'path';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// configure templating to hbs
app.set('view engine', 'hbs');

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));


//PART 5
import session from 'express-session';

app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
  if (!req.session.pageVisits) {
      req.session.pageVisits = 0;
  }
  req.session.pageVisits += 1;
  res.locals.pageVisits = req.session.pageVisits;

  // PART 6
  if (!req.session.myReviews) {
    req.session.myReviews = [];
  }

  next();
});


/*
app.get('/', async (req, res) => {
  //res.send('TODO: add / modify routes')
  // PART 2
  Review.find({})
        .then(reviews => {
            res.render('reviews', { reviews: reviews });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Error fetching reviews');
        });
});*/

// PART 3
app.get('/', async (req, res) => {
  const query = {};

  // Check if semester is provided, and it's not 'all'
  if (req.query.semester && req.query.semester !== 'All') {
      query.semester = req.query.semester;
  }

  // Check if year is provided and it's not an empty string
  if (req.query.year && req.query.year.trim() !== '') {
      query.year = req.query.year;
  }

  // Check if professor is provided and it's not an empty string
  if (req.query.professor && req.query.professor.trim() !== '') {
      query.professor = req.query.professor;
  }

  // Fetch the reviews based on the query
  const reviews = await Review.find(query);

  // Render your template with the reviews
  res.render('reviews', { reviews: reviews });
});



// PART 1
app.get('/reviews', async (req, res) => {
  try {
      const reviews = await Review.find();
      res.json(reviews);
  } catch (error) {
      res.status(500).send("Error fetching reviews");
  }
});


// PART 4
app.get('/reviews/add', (req, res) => {
  res.render('addReview');
});

app.post('/reviews/add', async (req, res) => {
  // Extract data from form submission
  const { courseNumber, courseName, semester, year, professor, review } = req.body;

  // Create new review instance and save to the database
  const newReview = new Review({
      courseNumber,
      courseName,
      semester,
      year,
      professor,
      review
  });

  req.session.myReviews.push(newReview); // For PART 6

  await newReview.save();

  // Redirect to the main page
  res.redirect('/');
});


// PART 6
app.get('/reviews/mine', (req, res) => {
  res.render('myReviews', { reviews: req.session.myReviews });
});



app.listen(process.env.PORT || 3000);
