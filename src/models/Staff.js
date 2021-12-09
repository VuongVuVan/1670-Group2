const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Staff = new Schema({
    email: { type: String, required: true, unique: true },
    image: {
        data: { type: Buffer, required: true },
        contentType: { type: String, required: true },
        name: { type: String }
    },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dob: { type: String, required: true },
    address: { type: String, required: true }

});

module.exports = mongoose.model("Staff", Staff);