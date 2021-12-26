const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Grade = new Schema({
    code: { type: String, required: true },
    name: { type: String },
    class: { type: String, required: true },
    grade: { type: String }
});

module.exports = mongoose.model("Grade", Grade);