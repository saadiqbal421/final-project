const mongoose = require("mongoose");
const { Schema } = mongoose;
const {ObjectId} = Schema;
// Define the form schema
const packagesSchema = new Schema({
  place: {
    type: String,
    required: true
  },
  days: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

// Create a model based on the form schema
const Form = mongoose.model('Form', packagesSchema);

module.exports = Form;
