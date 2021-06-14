const mongoose = require("mongoose");
const Books = require("./Books");
const Users = require("./Users");

const UserSchema = new mongoose.Schema({
  
  name: { type: [String], required: true},
  email: { type: String, required: true},
  rollNo: { type: String},
  branch: { type: String},
  checkoutHistory: { type: [String],dufault:[]}
});
module.exports = mongoose.model("Users", UserSchema);