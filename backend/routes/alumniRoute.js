const express= require('express');
const Router = express.Router();
const {loginController,registerController,updateController,deleteController,alumniSearch} = require("../controllers/alumniController");
const {protect} = require("../middlewares/authMiddleware");
Router.post("/login",loginController);
Router.post("/register",registerController);
Router.put("/update",protect,updateController);
Router.delete("/delete",protect,deleteController);
Router.post("/search",protect,alumniSearch);
// Router.get("/fetchalumni",protect,fetchAllalumniController);
module.exports = Router;

