const express = require('express');
const Router = express.Router();
const { loginController, registerController,updateController,deleteController,fetchController,fetchMyDetails } = require("../controllers/companyController");
const { protect } = require("../middlewares/authMiddleware");

Router.post("/login", loginController);
Router.post("/register", registerController);
Router.put("/update", protect, updateController);
Router.delete("/delete", protect, deleteController);
Router.get("/fetch", protect, fetchController);
Router.get("/me", protect, fetchMyDetails);

module.exports = Router;