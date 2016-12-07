var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
  name: String,
  code: String,
  dept: String,
  prof: String,
  img_link: String,
  overall_score: Number,
  diff_score: Number,
  teach_score: Number,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

mongoose.model('Course', CourseSchema);