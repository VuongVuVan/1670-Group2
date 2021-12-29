const mongoose = require("mongoose");

const connect = async() => {
    try {
        await mongoose.connect("mongodb+srv://vuongvu:0365466031@cluster0.3arkq.mongodb.net/fpteducation", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connect Successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };