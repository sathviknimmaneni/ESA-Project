const mongoose = require("mongoose");
const Books = require("./Books");
const Users = require("./Users");


const CheckoutSchema = new mongoose.Schema({
  
  bookId: { type: String},
  saved:{type: Boolean, required: true}
});

const UserSchema = new mongoose.Schema({
  
  name: { type: [String], required: true},
  email: { type: String, required: true},
  rollNo: { type: String},
  branch: { type: String},
  checkoutHistory: { type: [CheckoutSchema],dufault:[]}
});
module.exports = mongoose.model("Users", UserSchema);