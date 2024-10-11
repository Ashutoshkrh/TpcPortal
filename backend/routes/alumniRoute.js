const express= require('express');
const Router = express.Router();
const {loginController,registerController,updateController,deleteController,alumniSearch,fetchMyDetails} = require("../controllers/alumniController");
const {protect} = require("../middlewares/authMiddleware");
Router.post("/login",loginController);
Router.post("/register",registerController);
Router.put("/update",protect,updateController);
Router.delete("/delete",protect,deleteController);
Router.post("/search",protect,alumniSearch);
Router.get("/me",protect,fetchMyDetails);
// Router.get("/fetchalumni",protect,fetchAllalumniController);
module.exports = Router;

