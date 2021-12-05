const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Staff = new Schema({
    image: {
        data: { type: Buffer, require: true },
        contentType: String
    },
    email: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, min: 18, max: 65, required: true },
    dob: { type: String, required: true },
    address: { type: String, required: true }

});

module.exports = mongoose.model("Staff", Staff);