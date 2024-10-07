const mongoose = require('mongoose');
const bcrypt=require("bcryptjs");
//name, roll no, email, password, passout_year, branch, company(NA)

const alumniModel = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    rollNo : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },  
    password : {
        type: String,
        required: true
    },
    passout_year : {
        type: String,
        required: true
    },
    branch : {
        type: String,
        required: true
    },
    company : {
        type: String,
        required: false
    }
})

alumniModel.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

alumniModel.pre("save",async function(next){
    if(!this.isModified){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});


const alumni=mongoose.model("alumni",alumniModel);
module.exports=alumni;