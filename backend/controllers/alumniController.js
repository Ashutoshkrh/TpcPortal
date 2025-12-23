const express = require('express');
const alumniModel = require('../models/alumniModel.js');
const expressAsyncHandler = require('express-async-handler');
const generateToken = require("../config/generateToken");
const {response} = require("express");
const company = require('../models/companyModel.js');

const loginController = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const alumni  = await alumniModel.findOne({email});
    if(alumni && (await alumni.matchPassword(password))){
        res.json({
            _id: alumni._id,
            name: alumni.name,
            email: alumni.email,
            passout_year: alumni.passout_year,
            branch: alumni.branch,
            company: alumni.company,
            token: generateToken(alumni._id, "alumni")
        });
    }
    else{
        res.status(401).json({message: "Invalid email or password"});
        throw new Error("Invalid email or password");
    }
});
//name, roll no, email, password, passout_year, branch, company(NA)

const registerController=expressAsyncHandler (async (req,res)=>{
    const {name,rollNo,email,password,passout_year,branch,company}=req.body;
    //check if all fields are filled
    if(!name || !email || !password || !rollNo|| !passout_year || !branch){
        return res.status(400).json({message:"Fill required fields"});
    }

    //pre-existing user
    const alumniExist=await alumniModel.findOne({email:email});
    if(alumniExist){
        return res.status(400).json({message:"alumni already exist"});

    }
    //rollNo already taken
    const rollNoExists=await alumniModel.findOne({rollNo:rollNo});
    if(rollNoExists){
        return res.status(400).json({message:"Already registered with this roll number"});
 }
    //create alumni
    //name, rollno, email, password, passout_year, branch, company
    const alumni = await alumniModel.create({name,rollNo,email,password,passout_year,branch,company});
    if(alumni){
        res.status(201).json({
            _id:alumni._id,
            name:alumni.name,
            email:alumni.email,
            passout_year:alumni.passout_year,
            branch:alumni.branch,
            rollNo:alumni.rollNo,
            company:alumni.company,
            token: generateToken(alumni._id, "alumni"),
        });
        
    }
    else{
        res.status(400);
        throw new Error("Invalid user data");
    }
}
);



const updateController = expressAsyncHandler(async (req, res) => {
    const alumni = await alumniModel.findById(req.user._id);
    if (alumni) {
        alumni.name = req.body.name || alumni.name;

        if (req.body.email) {
            const temp = await alumniModel.findOne({ email: req.body.email });
            if (temp) {
                res.status(400).json({ message: "Email already exists" });
                throw new Error("Email already exists");
            }
        }
        if (req.body.rollNo) {
            const temp = await alumniModel.findOne({ rollNo: req.body.rollNo });
            if (temp) {
                res.status(400).json({ message: "Roll number already exists" });
                throw new Error("Roll number already exists");
            }
        }

        alumni.email = req.body.email || alumni.email;
        alumni.passout_year = req.body.passout_year || alumni.passout_year;
        alumni.branch = req.body.branch || alumni.branch;
        alumni.rollNo = req.body.rollNo || alumni.rollNo;
        alumni.company = req.body.company || alumni.company;
        if (req.body.password) {
            alumni.password = req.body.password;
        }
        const updatedalumni = await alumni.save();

        res.json({
            _id: updatedalumni._id,
            name: updatedalumni.name,
            email: updatedalumni.email,
            passout_year: updatedalumni.passout_year,
            branch: updatedalumni.branch,
            company: updatedalumni.company,
            message: "Successfully updated",
            token: generateToken(updatedalumni._id, "alumni"),
        });
    } else {
        res.status(404);
        throw new Error("alumni not found");
    }
});

const deleteController = expressAsyncHandler(async (req, res) => {
    const alumni = await alumniModel.findById(req.user._id);
    if (alumni) {
        await alumniModel.findByIdAndDelete(req.user._id);
        res.json({ message: "alumni removed" });
    } else {
        res.status(404);
        throw new Error("alumni not found");
    }
});

const alumniSearch = expressAsyncHandler(async (req, res) => {
    const query = {};

    if (req.body.name && typeof req.body.name === 'string') {
        query.name = { $regex: req.body.name, $options: "i" };
    }
    if (req.body.branch && typeof req.body.branch === 'string') {
        query.branch = { $regex: req.body.branch, $options: "i" };
    }
    if (req.body.passout_year && typeof req.body.passout_year === 'string') {
        query.passout_year = { $regex: req.body.passout_year, $options: "i" };
    }
    if (req.body.company && typeof req.body.company === 'string') {
        query.company = { $regex: req.body.company, $options: "i" };
    }
    if (req.body.rollNo && typeof req.body.rollNo === 'string') {
        query.rollNo = { $regex: req.body.rollNo, $options: "i" };
    }

    const alumnies = await alumniModel.find(query).select("-password").select("-_id");
    res.json(alumnies);
});

const fetchMyDetails = expressAsyncHandler(async (req,res) => {
    const details = req.user;
    res.json(details);
});
    

module.exports = { loginController, registerController, updateController, deleteController,alumniSearch, fetchMyDetails};