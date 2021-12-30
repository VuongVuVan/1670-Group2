const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    code: { type: String, unique: true, required: true, minlength: 4, maxlength: 20 },
    name: { type: String, unique: true, required: true, minlength: 5, maxlength: 30 },
    category: { type: String, required: true },
    description: { type: String, required: true, minlength: 5, maxlength: 100 },
    session: { type: Number, min: 15, max: 100 },
    createAt: { type: String, required: true },
    updateAt: { type: String, required: true }
});

module.exports = mongoose.model("Course", Course);