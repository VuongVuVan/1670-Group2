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
const categoriesRouter = require("./routes/categories");
const siteRouter = require("./routes/site");

const adminRouter = require("./routes/admin");
app.use("/admin", adminRouter);

app.use("/categories", categoriesRouter);
app.use("/", siteRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(__dirname);
    console.log('Sever is running at port ' + port);
});
