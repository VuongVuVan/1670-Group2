const Trainer = require("../models/Trainer");
const fs = require("fs");
const path = require("path");
const avatarPath = path.join(__dirname, "../public/uploads/trainer");

class TrainerController {
    index(req, res) {
        res.render("trainer");
    }

    layout(req, res) {
        res.render("trainer/layout");
    }

    show(req, res, next) {
        Trainer.find({}, (err, trainees) => {
            if (!err) res.render("trainer/profile", { data: trainers });
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
        const trainer = new Trainee(obj);
        trainer.save(err => {
            if (!err) res.redirect("/trainer/profile");
            else next(err);
        });
    }

    edit(req, res, next) {
        Trainer.findById(req.query.id, (err, trainers) => {
            if (!err) res.render("trainee/edit", { data: trainers });
            else next(err);
        });
    }

    update(req, res, next) {
        Trainer.updateOne({ _id: req.query.id }, req.body, err => {
            if (!err) res.redirect("trainer/profile");
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

module.exports = new TrainerController();