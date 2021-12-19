const mongoose = require("mongoose");

const connect = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/group2", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connect Successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };