const CourseTrainer = require("../models/CourseTrainer");

class CourseTrainerController {
    show(req, res, next) {
        CourseTrainer.find({}, (err, coursetrainer) => {
            if (!err) res.render("coursetrainer", { data: coursetrainer });
            else next(err);
        });
    }

    create(req, res, next) {
        res.render("coursetrainer/create")
    }

    store(req, res, next) {
        const CourseTrainer = new CourseTrainer(req.body);
        CourseTrainer.save(err => {
            if (!err) res.redirect("/coursetrainer");
            else next(err);
        })
    }

    edit(req, res, next) {
        CourseTrainer.findById(req.query.id, (err, coursetrainer) => {
            if (!err) res.render("coursetrainer/edit", { data: coursetrainer });
            else next(err);
        })
    }

    update(req, res, next) {
        CourseTrainer.updateOne({ _id: req.query.id }, req.body, err => {
            if (!err) res.redirect("/coursetrainer");
            else next(err);
        })
    }

    delete(req, res, next) {
        CourseTrainer.deleteOne({ _id: req.query.id }, err => {
            if (!err) res.redirect("/coursetrainer");
            else next(err);
        })
    }

    search(req, res, next) {
        CourseTrainer.find({ name: { $regex: req.query.qq, $options: 'i' } }, (err, coursetrainer) => {
            if (!err) {
                res.render("coursetrainer", { data: coursestrainer });
            } else next(err);
        });
    }
}
module.exports = new CourseTrainerController();