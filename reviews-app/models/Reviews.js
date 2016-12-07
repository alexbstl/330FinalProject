var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  body: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
});

mongoose.model('Review', ReviewSchema);