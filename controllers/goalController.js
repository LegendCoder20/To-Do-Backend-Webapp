// If you don't want to use TRY CATCH and Just use ERROR HANDLER WE use a package called EXPRESS ASYNC HANDLER [ Below Line ]
const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc ---  Get Goals
// @route ---- GET request to /api/goals
// @access ---- Private

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({user: req.user.id}); // Now we have the user Field on the Goals which has the Relationship to the User Model
  res.status(200).json(goals);

  // res.status(200).json({message: "Get Goals"});
});

// @desc ---  Set Goals
// @route ---- POST request to /api/goals
// @access ---- Private

const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    // res.status(400).json({message: "Please add a Text Field"}); // Instead of Using .json() Error Showing
    res.status(400);
    // Using Express Error Handler
    throw new Error("Please Add a Text Field");
  }
  const goals = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goals);

  // res.status(200).json({message: "Set Goals"});
});

// @desc ---  Update Goals
// @route ---- PUT request to /api/goals:id   with ID
// @access ---- Private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id); // Requesting parameters for the ID

  if (!goal) {
    res.status(400);
    throw new Error("Goal Not Found");
  }

  // Check for User
  if (!req.user) {
    res.status(401);
    throw new Error("User not Found");
  }

  // make sure the Lgged in user Matches the Goal User
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  const UpdatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); // new: true     will Create a New Text If it Dosen't Exists

  res.status(200).json(UpdatedGoal);
  // res.status(200).json({message: `Get Goals ${req.params.id}`}); // ${req.params.id}  means Showing ID [Nothing More]
});

// @desc ---  Delete Goals
// @route ---- DELETE request to /api/goals:id   with ID
// @access ---- Private

const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal Not Found");
  }

  // Check for User
  if (!req.user) {
    res.status(401);
    throw new Error("User not Found");
  }

  // make sure the Lgged in user Matches the Goal User
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  await goal.deleteOne();

  res.status(200).json({id: req.params.id});

  // res.status(200).json({message: `Get Goals ${req.params.id}`});
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
