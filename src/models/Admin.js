const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email: {type:String, required:true, unique:true},
    image: {
        data: {type:Buffer, required:true},
        contentType: {type:String, required:true},
        name: {type:String}
    },
    name: {type:String, required:true, minlength:2, maxlength:30},
    dob: {type:String, required:true},
    address: {type:String, required:true}
});

module.exports = mongoose.model("Admin", AdminSchema);