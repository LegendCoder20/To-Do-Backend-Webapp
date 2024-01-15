//  Here is where we define our Schema which is gonna be fields for this Particular Resources

const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    // Below user:  Object will allow us to have a user Associated with a Goal
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    text: {
      type: String,
      required: [true, "Please add a Text Value"],
    },
  },
  {
    timestamps: true, // This will Create a UpdatedAt and CreatedAt Field Automatically in MongoDB ( eg :- Each wuser will contain a createdat and updatedad info it will show when it was first created and last updated)
  }
);

module.exports = mongoose.model("Goal", goalSchema);
