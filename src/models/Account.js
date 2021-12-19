const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    email: { type: String, required: true, unique: true, minlength: 12, maxlength: 40 },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

module.exports = mongoose.model("Account", AccountSchema);