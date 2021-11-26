const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    coursecategory: { type: String, default: "Unknown" },
    name: { type: String, default: "Unknown" },
    description: { type: String }
});

module.exports = mongoose.model("Course", Course);