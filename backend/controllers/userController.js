const express = require('express');
const UserModel = require('../models/userModel.js');
const expressAsyncHandler = require('express-async-handler');
const generateToken = require("../config/generateToken");
const {response} = require("express");

const loginController = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user  = await UserModel.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            passout_year: user.passout_year,
            branch: user.branch,
            message:"Successfully logged in",
            token: generateToken(user._id)
        });
    }
    else{
        res.status(401).json({message: "Invalid email or password"});
        throw new Error("Invalid email or password");
    }
});
//name, roll no, email, password, passout_year, branch

const registerController=expressAsyncHandler (async (req,res)=>{
    const {name,rollNo,email,password,passout_year,branch}=req.body;
    //check if all fields are filled
    if(!name || !email || !password || !rollNo|| !passout_year || !branch){
        return res.status(400).json({message:"All fields are required"});
    }

    //pre-existing user
    const userExist=await UserModel.findOne({email:email});
    if(userExist){
        return res.status(400).json({message:"User already exist"});

    }
    //rollNo already taken
    const rollNoExists=await UserModel.findOne({rollNo:rollNo});
    if(rollNoExists){
        return res.status(400).json({message:"Already registered with this roll number"});
 }
    //create user
    //name, rollno, email, password, passout_year, branch
    const user = await UserModel.create({name,rollNo,email,password,passout_year,branch});
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            passout_year:user.passout_year,
            branch:user.branch,
            rollNo:user.rollNo,
            token: generateToken(user._id),
        });
        
    }
    else{
        res.status(400);
        throw new Error("Invalid user data");
    }
}
);


const updateController = expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;

        if(req.body.email){
            const temp = await UserModel.findOne({email:req.body.email});
            if(temp){
                res.status(400).json({message:"Email already exists"});
                throw new Error("Email already exists");
            }                   
        }
        if(req.body.rollNo){
            const temp = await UserModel.findOne({rollNo:req.body.rollNo});
            if(temp){
                res.status(400).json({message:"Roll number already exists"});
                throw new Error("Roll number already exists");
            }
        }   

        user.email = req.body.email || user.email;
        user.passout_year = req.body.passout_year || user.passout_year;
        user.branch = req.body.branch || user.branch;
        user.rollNo = req.body.rollNo || user.rollNo;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            passout_year: updatedUser.passout_year,
            branch: updatedUser.branch,
            message: "Successfully updated",
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
}
);

const deleteController = expressAsyncHandler(async (req,res)=>{
    const user = await UserModel.findById(req.user._id);
    if(user){
        await UserModel.findByIdAndDelete(req.user._id);
        res.json({message:"User removed"});
    }
    else{
        res.status(404);
        throw new Error("User not found");
    }

})

module.exports = {loginController, registerController, updateController,deleteController};