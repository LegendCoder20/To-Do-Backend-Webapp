const express = require("express"); // Its Common Js Syntax
const router = express.Router(); // .Router() is an inBuild Method of Express
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController"); // To get the getGoal Function

const {protect} = require("../middleware/authMiddleware");

// Define routes for handling goals

// router.get("/", getGoals);
// router.post("/", setGoals);
// OR  [Above 2 Lines Compact Code is Below in One Line]
router.route("/").get(protect, getGoals).post(protect, setGoals);

// router.put("/:id", updateGoals);
// router.delete("/:id", deleteGoals);
// OR  [Above 2 Lines Compact Code is Below in One Line]
router.route("/:id").put(protect, updateGoals).delete(protect, deleteGoals);

module.exports = router;
