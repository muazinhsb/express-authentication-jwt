const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  username: {
    type: String,
    required: true,
    min: 6,
    max: 12,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  phone: {
    type: Number,
    // required: true,
    min: 100000000,
    max: 99999999999999,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 16,
    select: false,
  },
  picture: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
