const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Alumni = require("../models/alumniModel");
const Company = require("../models/companyModel");
const expressAsyncHandler = require("express-async-handler");

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);      
      
      let user;
    //   if(role!=decoded.role){
    //     res.status(401);
    //     throw new Error("Invalid role");
    //   }

      if (decoded.role === "User") {
        user = await User.findById(decoded.id).select("-password");
      } else if (decoded.role === "alumni") {
        user = await Alumni.findById(decoded.id).select("-password");
      } else if (decoded.role === "company") {
        user = await Company.findById(decoded.id).select("-password");
      } else {
        res.status(401);
        throw new Error("Invalid role in token");
      }

      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }

      // 🔑 VERY IMPORTANT
      req.user = user;
      req.user.role = decoded.role;
      console.log(decoded, user);
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
