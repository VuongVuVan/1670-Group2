const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    name: { type: String, default: "Unknown" },
    description: { type: String }
});

module.exports = mongoose.model("Category", Category);