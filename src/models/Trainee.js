const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TraineeSchema = new Schema({
    email: {type:String, required:true, unique:true},
    image: {
        data: {type:Buffer},
        contentType: String
    },
    name: {type:String, required:true},
    age: {type:Number},
    dob: {type:String, required:true},
    education:{type:String},
    address: {type:String, required:true}
    
});

module.exports = mongoose.model("Trainee", TraineeSchema);