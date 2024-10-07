const express= require('express');
const Router = express.Router();
const {loginController,registerController,updateController,deleteController} = require("../controllers/userController");
const {protect} = require("../middlewares/authMiddleware");
Router.post("/login",loginController);
Router.post("/register",registerController);
Router.put("/update",protect,updateController);
Router.delete("/delete",protect,deleteController);
// Router.get("/fetchUsers",protect,fetchAllUsersController);
module.exports = Router;

