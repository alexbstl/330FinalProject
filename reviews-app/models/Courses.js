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
//CourseSchema.methods.totalScore = function(cb){
//  overall_score = 0;
//  diff_score = 0;
//  teach_score=0;
//  console.log(this.reviews);
//  for (var i = 1;i<this.reviews.length;i++){
//    overall_score+=this.reviews[i].overall_score;
//    diff_score+=this.reviews[i].diff_score;
//    teach_score+=this.reviews[i].teach_score;
//  }
//  overall_score=overall_score/length(this.reviews)
//  diff_score=diff_score/length(this.reviews)
//  teach_score=teach_score/length(this.reviews)
//
//}

mongoose.model('Course', CourseSchema);
