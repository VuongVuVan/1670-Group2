const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true, default:"123456789"},
    role: {type:String, required:true}
}); 

module.exports = mongoose.model("Account", AccountSchema);