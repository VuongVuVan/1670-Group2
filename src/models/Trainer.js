const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Trainer = new Schema({
    email: { type: String, required: true, unique: true, minlength: 12, maxlength: 40 },
    image: {
        data: { type: Buffer, required: true },
        contentType: { type: String, required: true },
        name: { type: String }
    },
    name: { type: String, required: true },
    code: { type: String, required: true },
    dob: { type: String, required: true },
    address: { type: String, required: true },
    specialty: { type: String, required: true }
});

module.exports = mongoose.model("Trainer", Trainer);