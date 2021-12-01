const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    total: { type: Number, required: true }
});

module.exports = mongoose.model("Category", Category);