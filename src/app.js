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
    cookie: { maxAge: 5 * 24 * 60 * 60 * 1000 },
}));

app.set('view engine', 'hbs');
// set session 
app.get('/set_session', (req, res) => {
    //set a object to session
    req.session.User = {
        'userId': '61bed745fe7c9da5c8310e0c',
        'role': 'trainer',
        'userName': 'Thanh',
        "code": "GCH111"
    }

    return res.status(200).json({
        status: 'success'
    })
})
app.use('/', (req, res, next) => {
        //set a object to session
        req.session.user = {
            'userId': '<trainercode>',
            'role': 'trainer',
            'userName': 'Thanh',
            'code': 'GCH111'
        }
        next()
    })
    // get session 
app.use('/get_session', (req, res) => {
        //check session
        if (req.session.User) {
            return res.status(200).json({
                status: 'success',
                session: req.session.User
            })
        }
        return res.status(200).json({
            status: 'error',
            session: 'No session'
        })
    })
    // //destroy session
app.use('/destroy_session', (req, res) => {
    //destroy session
    req.session.destroy(function(err) {
        return res.status(200).json({
            status: 'success',
            session: 'cannot access session here'
        })
    })
})



app.set('views', path.join(__dirname, 'views'));
const hbs = require('hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
hbs.registerHelper("convertImage", data => {
    if (data != null) {
        return Buffer.from(data).toString('base64');
    }

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

const staffRouter = require("./routes/staff");
app.use("/staff", staffRouter);

const traineeRouter = require("./routes/trainee");
app.use("/trainee", traineeRouter);

const trainerRouter = require("./routes/trainer");
app.use("/trainer", trainerRouter);

const siteRouter = require("./routes/site");
app.use("/", siteRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Sever is running at port ' + port);
});