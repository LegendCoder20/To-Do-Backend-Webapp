// Middleware is a Piece of Function that Runs during the request Response Cycle

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// ' next  '  Since It is a Middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;
  // With Express we can access the Headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get Token from Header
      token = req.headers.authorization.split(" ")[1];

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password"); // It specifies that the result should include all fields except the "password" field.

      next(); // Calling Next Piece of Middleware
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized , no Token");
  }
});

module.exports = {protect};
