var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  body: String,
  overall_score: Number,
  diff_score: Number,
  teach_score: Number,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
});


mongoose.model('Review', ReviewSchema);
