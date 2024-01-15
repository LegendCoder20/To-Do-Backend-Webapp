const mongoose = require("mongoose");
// I Encoded it Because I gave password in MongoDB Website as aryan@2002 which contains '@' which is an Special Character so It needed to be Encoded or Else You can Put MONGO_URI in .env file
const password = encodeURIComponent("aryan@2002");
let uri = `mongodb+srv://aryan_m:${password}@cluster0.xd3d8lw.mongodb.net/mernapp?retryWrites=true&w=majority`;

// All of Mongooese Methods are Asynchronous that Returns Promise
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1); // Exit the Process with Failure // Check out my WORD FILE
  }
};

module.exports = connectDB;
