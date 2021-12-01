const mongoose = require("mongoose");

const connect = async() => {
    try {
<<<<<<< HEAD
        await mongoose.connect("mongodb://127.0.0.1:27017/GCH0805DB", {
=======
        await mongoose.connect("mongodb://localhost:27017/ASM1670", {
>>>>>>> 221f796f29b27659e58ad3b05c83ca20e3e78870
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connect Successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };