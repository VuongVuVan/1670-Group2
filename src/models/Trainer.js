const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Trainer = new Schema({
    email: { type: String, required: true, unique: true, minlength: 12, maxlength: 40 },
    image: {
        data: { type: Buffer, required: true },
        contentType: { type: String, required: true },
        name: { type: String }
    },
    name: { type: String, required: true, minlength: 5, maxlength: 30 },
    code: { type: String, required: true, unique: true, minlength: 4, maxlength: 20 },
    dob: { type: String, required: true },
    address: { type: String, required: true, minlength: 6, maxlength: 100 },
    specialty: { type: String, required: true, minlength: 2, maxlength: 20 }
});

module.exports = mongoose.model("Trainer", Trainer);