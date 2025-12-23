const express = require('express');
const companyModel = require('../models/companyModel.js');
const expressAsyncHandler = require('express-async-handler');
const generateToken = require("../config/generateToken");
const { response } = require("express");

const loginController = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const company = await companyModel.findOne({ email });
    if (company && (await company.matchPassword(password))) {
        res.json({
            _id: company._id,
            name: company.name,
            email: company.email,
            description: company.description,
            message:"Successfully logged in",
            token: generateToken(company._id, "company")
        });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
        throw new Error("Invalid email or password");
    }
});

// name, email, password, description

const registerController = expressAsyncHandler(async (req, res) => {
    const { name, email, password, description } = req.body;
    // check if all fields are filled
    if (!name || !email || !password || !description) {
        return res.status(400).json({ message: "Fill required fields" });
    }

    // pre-existing company
    const companyExist = await companyModel.findOne({ email: email });
    if (companyExist) {
        return res.status(400).json({ message: "company already exists" });
    }

    // create company
    const company = await companyModel.create({ name, email, password, description });
    if (company) {
        res.status(201).json({
            _id: company._id,
            name: company.name,
            email: company.email,
            description: company.description,
            token: generateToken(company._id, "company"),
        });
    } else {
        res.status(400);
        throw new Error("Invalid company data");
    }
});

const updateController = expressAsyncHandler(async (req, res) => {
    const company = await companyModel.findById(req.user._id);
    if (company) {
        company.name = req.body.name || company.name;

        if (req.body.email) {
            const temp = await companyModel.findOne({ email: req.body.email });
            if (temp) {
                res.status(400).json({ message: "Email already exists" });
                throw new Error("Email already exists");
            }
        }

        company.email = req.body.email || company.email;
        company.description = req.body.description || company.description;
        if (req.body.password) {
            company.password = req.body.password;
        }
        const updatedcompany = await company.save();

        res.json({
            _id: updatedcompany._id,
            name: updatedcompany.name,
            email: updatedcompany.email,
            description: updatedcompany.description,
            message: "Successfully updated",
            token: generateToken(updatedcompany._id, "company"),
        });
    } else {
        res.status(404);
        throw new Error("company not found");
    }
});

const deleteController = expressAsyncHandler(async (req, res) => {
    const company = await companyModel.findById(req.user._id);
    if (company) {
        await companyModel.findByIdAndDelete(req.user._id);
        res.json({ message: "company removed" });
    } else {
        res.status(404);
        throw new Error("company not found");
    }
});

const fetchController = expressAsyncHandler(async (req, res) => {
    console.log(req.user);
    const company = await companyModel.findById(req.user._id);
    if(company){
        res.status(404).json({message:"Bad page request"});
        throw new Error("Bad page request");
    }
    const companies = await companyModel.find();
    res.json({companies: companies, message: "successfully fetched"});

});

const fetchMyDetails = expressAsyncHandler(async (req,res) => {
    const details = req.user;
    res.json(details);
});
    

module.exports = { loginController, registerController, updateController, deleteController,fetchController, fetchMyDetails};