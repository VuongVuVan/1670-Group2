const mongoose = require("mongoose");

const connect = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/ASM1670", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connect successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };