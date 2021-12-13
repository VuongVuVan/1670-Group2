const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Trainee = new Schema({
    email: {type:String, required:true, unique:true},
    image: {
        data: {type:Buffer, required:true},
        contentType: {type:String, required:true},
        name: {type:String}
    },
    name: {type:String, required:true},
    dob: {type:String, required:true},
    address: {type:String, required:true},
    education: {type:String, required:true},
    traineecode: {type:String, required:true}
});

module.exports = mongoose.model("Trainee", Trainee);