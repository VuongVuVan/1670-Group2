const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email: {type:String, required:true, unique:true},
    image: {
        data: {type:Buffer, required:true},
        contentType: String
    },
    name: {type:String, required:true},
    age: {type:Number, required:true},
    dob: {type:String, required:true},
    address: {type:String, required:true}
});

module.exports = mongoose.model("Admin", AdminSchema);