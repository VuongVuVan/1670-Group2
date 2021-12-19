const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseClassSchema = new Schema({
    position: { type: Number, required: true, index: true },
    class_name: { type: String, required: true },
    course_name: { type: String, required: true },
    total_trainees: { type: Number },
    trainers: { type: String, required: true },
    trainees: { type: Array, required: true },
});

module.exports = mongoose.model("CourseClass", CourseClassSchema);