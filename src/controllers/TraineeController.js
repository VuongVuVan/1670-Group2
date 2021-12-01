const Trainee = require("../models/Trainee");
const fs = require("fs");
const path = require("path");
const avatarPath = path.join(__dirname, "../public/uploads/trainee");

class TraineeController {
    index(req, res) {
        res.render("trainee");
    }

    layout(req, res) {
        res.render("trainee/layout");
    }

    show(req, res, next) {
        Trainee.find({}, (err, trainees) => {
            if (!err) res.render("trainee/profile", { data: trainees });
            else next(err);
        });
    }

    // create(req, res, next) {
    //     res.render("seeall/create")
    // }

    store(req, res, next) {
        const obj = {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
            dob: req.body.dob,
            address: req.body.address,
            education: req.body.education,
            image: {
                data: fs.readFileSync(path.join(destiantion, req.file.filename)),
                contentType: "image/png"
            }
        }
        console.log(obj)
        const trainee = new Trainee(obj);
        trainee.save(err => {
            if (!err) res.redirect("/trainee/profile");
            else next(err);
        });
    }

    edit(req, res, next) {
        Trainee.findById(req.query.id, (err, trainees) => {
            if (!err) res.render("trainee/edit", { data: trainees });
            else next(err);
        });
    }

    update(req, res, next) {
        Trainee.updateOne({ _id: req.query.id }, req.body, err => {
            if (!err) res.redirect("trainee/profile");
            else next(err);
        });
    }

    // delete(req, res, next) {
    //     Seeall.deleteOne({ _id: req.query.id }, err => {
    //         if (!err) res.redirect("/seeall");
    //         else next(err);
    //     });
    // }

}

module.exports = new TraineeController();