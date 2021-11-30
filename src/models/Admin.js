const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email: {type:String, required:true, unique:true},
    image: {type:Buffer},
    name: {type:String, required:true},
    age: {type:Number},
    dob: {type:Date, required:true},
    address: {type:String, required:true}
});

module.exports = mongoose.model("Admin", AdminSchema);