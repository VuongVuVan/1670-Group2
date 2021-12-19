const mongoose = require("mongoose");

const connect = async() => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Group2", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connect Successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };