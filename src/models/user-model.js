const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: String,
  displayName: String,
  email: String,
  photo: String,
});

userSchema.statics.findOrCreate = function findOrCreate(profile, cb) {
  var userObj = new this();
  this.findOne({ id: profile.id }, function (err, result) {
    console.log(result);
    if (!result) {
      userObj.id = profile.id;
      userObj.displayName = profile.displayName;
      userObj.email = profile.emails[0].value;
      userObj.photo = profile.photos[0].value;
      userObj.save(cb);
    } else {
      cb(err, result);
    }
  });
};

module.exports = mongoose.model("User", userSchema);
