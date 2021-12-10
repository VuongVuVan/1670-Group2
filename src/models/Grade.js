const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Grade = new Schema({
    code: {type: Number },
    coursename: {type: String},
    trainer: { type: String },
    class: { type: String },
    grade: {type: String }
});

module.exports = mongoose.model("Grade", Grade);