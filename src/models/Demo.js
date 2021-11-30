const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Demo = new Schema({
    name: { type: String},
    description: { type: String },
    image: {
        data: {type:Buffer},
        contentType: String
    }
});

module.exports = mongoose.model("Demo", Demo);