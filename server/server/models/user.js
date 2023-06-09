const mongoose = require("mongoose");
const { Schema } = mongoose;
const {ObjectId} = Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    
    isVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,

    },
    date :{
      type : Date,
      default : Date.now()
    },
  },
  
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = { User };
