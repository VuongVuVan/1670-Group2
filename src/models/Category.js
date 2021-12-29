const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    name: { type: String, required: true, unique: true, minlength: 2, maxlength: 30 },
    description: { type: String, required: true, minlength: 5, maxlength: 50 },
    total: { type: Number, required: true, min: 15, max: 40 }
});

module.exports = mongoose.model("Category", Category);