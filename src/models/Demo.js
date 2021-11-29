const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Demo = new Schema({
    name: { type: String, default: "Unknown" },
    description: { type: String }
});

module.exports = mongoose.model("Demo", Demo);