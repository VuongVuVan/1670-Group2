const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true, minlength: 2, maxlength: 30 },
    category: { type: String, required: true },
    description: { type: String, required: true },
    session: { type: Number, required: true },
    createAt: { type: String, required: true },
    updateAt: { type: String, required: true },

});

module.exports = mongoose.model("Course", Course);