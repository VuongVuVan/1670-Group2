const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Staff = new Schema({
    image: {
        data: { type: Buffer, require: true },
        contentType: String
    },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dob: { type: String, required: true },
    address: { type: String, required: true }

});

module.exports = mongoose.model("Staff", Staff);