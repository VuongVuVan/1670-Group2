const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Seeall = new Schema({
    code: {type: Number, require: true },
    coursecategory: {type: String, require: true},
    name: { type: String, require: true },
    trainer: { type: String, require: true },
    createAt: { type: String, required: true },
    updateAt: { type: String, required: true },
    total: { type: Number, require: true }
});

module.exports = mongoose.model("Seeall", Seeall);