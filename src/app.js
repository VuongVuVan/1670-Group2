const express = require("express");
const app = express();
const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const session = require("express-session");
app.use(session({
    secret: "HnU57-Hks465",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 5 * 24 * 60 * 60 * 1000 }
}));

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'));
const hbs = require('hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
hbs.registerHelper("convertImage", data => {
    return Buffer.from(data).toString('base64');
});
hbs.registerHelper("convertDate", stringDate => {
    return stringDate.split("-").reverse().join("-");
});
hbs.registerHelper("calculateAge", stringDate => {
    const birthYear = stringDate.split("-")[2];
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
});
hbs.registerHelper("removeSpace", string => {
    return string.split(" ").join("");
});

// Connect to db
const db = require("./config/db");
db.connect();

const demoRouter = require("./routes/demo");
app.use("/demo", demoRouter);

const adminRouter = require("./routes/admin");
app.use("/admin", adminRouter);

//Staff: 
const staffRouter = require("./routes/staff");
app.use("/staff", staffRouter);

const traineeRouter = require("./routes/trainee");
app.use("/trainee", traineeRouter);

const gradeRouter = require("./routes/grade");
app.use("/grade", gradeRouter);

const seeallRouter = require("./routes/seeall");
app.use("/seeall", seeallRouter);
//Trainer
const trainerRouter = require("./routes/trainer");
app.use("/trainer", trainerRouter);

const siteRouter = require("./routes/site");
app.use("/", siteRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Sever is running at port ' + port);
});