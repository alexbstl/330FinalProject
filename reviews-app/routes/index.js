//Define Requirements
var flash = require('connect-flash');

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var Account = require('../models/Users');
var router = express.Router();

//Get Home Page
router.get('/', function(req, res, next) {

  if(req.user){
    res.render('index', { title: 'Express', user: req.user });
  }
  res.render('login');
});

//registration
router.get('/register', function(req, res) {
  res.render('register', { });
});

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.render('register', { account : account });
    }

    passport.authenticate('local')(req, res, function () {
      // res.render('login',{account: account});
      res.render('index', { title: 'Express', user: req.user });
    });
  });
});

//Login
router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      res.render('login');
      // return res.send(401,{ success : false, message : 'authentication failed' });
    }
    req.login(user, function(err){
      if(err){
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


//Define Mongoose Models
var Course = mongoose.model('Course');
var Review = mongoose.model('Review');

//Get Courses From Database
router.get('/courses', function(req, res, next) {
  Course.find(function(err, courses){
    if(err){
      return next(err);
    }
    res.json(courses);
  });
});

//Create New Course
router.post('/courses', function(req, res, next) {
  var course = new Course(req.body);
  course.save(function(err, course){
    if(err){ return next(err); }
    res.json(course);
  });
});

//Find a Course By ID
router.param('course', function(req, res, next, id) {
  var query = Course.findById(id);
  query.exec(function (err, course){
    if (err) { return next(err); }
    if (!course) { return next(new Error("can't find course")); }
    req.course = course;
    return next();
  });
});

//Populate a Course with Reviews
router.get('/courses/:course', function(req, res, next) {
  req.course.populate('reviews', function(err, course) {
    res.json(course);
  });
});


//Get Review By ID
router.param('review', function(req, res, next, id) {
  var query = Review.findById(id);

  query.exec(function (err, review){
    if (err) { return next(err); }
    if (!review) { return next(new Error("can't find review")); }

    req.review = review;
    return next();
  });
});


router.post('/courses/:course/reviews', function(req, res, next) {
  console.log("THIS IS WHERE U R");
  var review = new Review(req.body);
  review.course = req.course;
  review.save(function(err, review){
    if(err){ return next(err); }

    req.course.reviews.push(review);

    req.course.save(function(err, course) {
      if(err){ return next(err); }
      res.json(review);
    });
    // req.course.totalScore(function(err){
    //   if(err){return next(err);}
    // });
  });
});


module.exports = router;
