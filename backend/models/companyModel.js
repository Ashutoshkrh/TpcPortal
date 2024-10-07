const mongoose = require('mongoose');
const bcrypt=require("bcryptjs");
//name, email, password, description

const companyModel = mongoose.Schema({
    name : {
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
    description : {
        type: String,
        required: true
    }
})


companyModel.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

companyModel.pre("save",async function(next){
    if(!this.isModified){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});


const company=mongoose.model("company",companyModel);
module.exports=company;