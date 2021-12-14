const Trainee = require("../models/Trainee");
const fs = require("fs");
const path = require("path");
const date = require("../utils/dateHandler");


class TraineeController {
    index(req, res) {
        res.render("trainee", { user: req.session.user });
    }

    layout(req, res) {
        res.render("trainee/layout");
    }

    show(req, res, next) {
        Trainee.find({}, (err, trainees) => {
            if (!err) res.render("trainee/profile", { data: trainees, user: req.session.user });
            else next(err);
        });
    }


    edit(req, res, next) {
        Trainee.findById(req.query.id, (err, trainees) => {
            if (!err) res.render("trainee/edit", { data: trainees, user: req.session.user });
            else next(err);
        });
    }

    update(req, res, next) {
        const obj = {
            email: req.body.email,
            name: req.body.name,
            dob: date.convertDateAsString(req.body.dob),
            address: req.body.address,
            education: req.body.education,
            image: {
                data: fs.readFileSync(req.file.path),
                contentType: "image/png"
            }
        }
        Trainee.updateOne({ _id: req.query.id }, req.body, err => {
            if (!err) res.redirect("/trainee/profile");
            else next(err);
        });
    }
}

module.exports = new TraineeController();