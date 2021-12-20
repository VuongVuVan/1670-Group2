const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    code: { type: String, unique: true, required: true },
    name: { type: String, unique: true, required: true, minlength: 2, maxlength: 30 },
    category: { type: String },
    description: { type: String },
    session: { type: Number},
    createAt: { type: String, required: true },
    updateAt: { type: String, required: true },
    trainer: { type: String},
    total: { type: Number},
});

module.exports = mongoose.model("Course", Course);