const express = require("express");
const app = express();
const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'));
const hbs = require('hbs');

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Connect to db
const db = require("./config/db");
db.connect();

// Use a router for a particular root URL
const demoRouter = require("./routes/demo");
app.use("/demo", demoRouter);

const categoriesRouter = require("./routes/categories");
app.use("/categories", categoriesRouter);

const coursesRouter = require("./routes/courses");
app.use("/courses", coursesRouter);

const adminRouter = require("./routes/admin");
app.use("/admin", adminRouter);

const staffRouter = require("./routes/staff");
app.use("/staff", staffRouter);

const siteRouter = require("./routes/site");
app.use("/", siteRouter);

//Trainee
const traineeRouter = require("./routes/trainee");
app.use("/trainee", traineeRouter);

const trainerRouter = require("./routes/trainer");
app.use("/trainer", trainerRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Sever is running at port ' + port);
});