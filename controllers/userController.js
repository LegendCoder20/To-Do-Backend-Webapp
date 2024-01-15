const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc ---    SET User
// @route ---- POST request to /api/users
// @access ---- Public

// We have to Wrap it with the asyncHandler to Handle the Errors
const registerUser = asyncHandler(async (req, res) => {
  const {name, number, email, password} = req.body;

  if (!name || !number || !email || !password) {
    res.status(400);
    throw new Error("Please Add all Fields");
  }

  const userExists = await User.findOne({email});
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  //  HASH PASSWORD

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt); // Hash will take 2 thing one is Plain Password and [ salt ]  // Password will come from Postman

  // CREATE USER
  const user = await User.create({
    name,
    number,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      number: user.number,
      email: user.email,
      token: generateToken(user._id), // We are Passing Actual ID in the Generate Token
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }

  // res.json({
  //   message: "Register User",
  // });
});

// @desc ---  Authenticate the User
// @route ----  request to /api/users/login
// @access ---- Public

const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body; // Because It is in the Body

  // CHECK FOR USER EMAIL
  const user = await User.findOne({email});
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.email,
      number: user.number,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("No Registered User Found"); // This Message will be See on Front-End
  }
  // res.json({
  //   message: "Login User",
  // });
});

// @desc ---  Get User Data
// @route ---- GET request to /api/users/me
// @access ---- Private

const getMe = asyncHandler(async (req, res) => {
  // res.json({
  //   message: "User Data Display",
  // });
  res.status(200).json(req.user);
});

// GENERATE JWT

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
