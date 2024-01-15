const mongoose = require("mongoose"); //  Its and ODM to Interact with our MongoDB

const userSchema = mongoose.Schema(
  {
    // Below Object Keys are of MongoDB      Example [ type, require, unique ]    // Search More About Them

    name: {
      type: String,
      required: [true, "Please Add a Name"],
    },
    number: {
      type: Number,
      required: [true, "Please Enter your Number"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please Enter your Email"], // TRUE means this Field is Required and After that Comma its the Validation Message
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Enter your Password"],
    },
  },
  {timestamps: true} // This will Create a Updated Add and Created Add Field Automatically
);

module.exports = mongoose.model("User", userSchema); // "USER is the Model Name and userSChema is the Function"
