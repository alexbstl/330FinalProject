//Define Requirements
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

//Get Home Page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;

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

/*
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

//Get Posts From Database
router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts){
    if(err){
      return next(err);
    }

    res.json(posts);
  });
});

//Create a New Post
router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

//Find a Post By ID
router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error("can't find post")); }

    req.post = post;
    return next();
  });
});

//Upvote a Post
router.put('/posts/:post/upvote', function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

//Downvote a Post
router.put('/posts/:post/downvote', function(req, res, next) {
  req.post.downvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

//ADDED

//Get Comment By ID
router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error("can't find comment")); }

    req.comment = comment;
    return next();
  });
});

//Populate a Post with Comments
router.get('/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    res.json(post);
  });
});

router.post('/posts/:post/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

router.put('/posts/:post/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }

    res.json(comment);
  });
});
*/
