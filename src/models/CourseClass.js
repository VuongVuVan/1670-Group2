const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseClassSchema = new Schema({
    class_name: { type: String, required: true },
    course_name: { type: String, required: true },
    total_trainees: { type: Number, required: true },
    trainers: [{
        trainer_code: { type: String, required: true }
    }],
    trainees: [{
        trainee_code: { type: String, required: true }
    }],
    grade_status: { type: String, required: true },
});

module.exports = mongoose.model("CourseClass", CourseClassSchema);