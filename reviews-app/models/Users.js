var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UsersSchema = new Schema({
    username: String,
    password: String
});

Users.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users', UsersSchema);
