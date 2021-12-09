const CourseTrainer = require("../models/CourseTrainer");

class CourseTrainerController {
    show(req, res, next) {
        CourseTrainer.find({}, (err, coursetrainers) => {
            if (!err) res.render("coursetrainer", { data: coursetrainers });
            else next(err);
        });
    }

    create(req, res, next) {
        res.render("coursetrainers/create")
    }

    store(req, res, next) {
        const coursetrainers = new CourseTrainer(req.body);
        coursetrainers.save(err => {
            if (!err) res.redirect("/coursetrainer");
            else next(err);
        });
    }

    edit(req, res, next) {
        CourseTrainer.findById(req.query.id, (err, coursetrainers) => {
            if (!err) res.render("coursetrainer/edit", { data: coursetrainers });
            else next(err);
        });
    }

    update(req, res, next) {
        CourseTrainer.updateOne({ _id: req.query.id }, req.body, err => {
            if (!err) res.redirect("/coursetrainer");
            else next(err);
        });
    }

    delete(req, res, next) {
        CourseTrainer.deleteOne({ _id: req.query.id }, err => {
            if (!err) res.redirect("/coursetrainer");
            else next(err);
        });
    }

    search(req, res, next) {
        CourseTrainer.find({ name: { $regex: req.query.q, $options: 'i' } }, (err, sees) => {
            if (!err) {
                res.render("coursetrainer", { data: coursetrainers });
            } else next(err);
        });
    }
}

module.exports = new CourseTrainerController();