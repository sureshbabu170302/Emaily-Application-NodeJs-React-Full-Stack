const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  googleID: String,
});

mongoose.model("Users", userSchema);