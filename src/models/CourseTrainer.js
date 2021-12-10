const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseTrainer = new Schema({
    code: { type: Number },
    coursecategory: { type: String },
    name: { type: String, default: "Unknown" },
    trainer: { type: String },
    total: { type: Number }
});

module.exports = mongoose.model("CourseTrainer", CourseTrainer);