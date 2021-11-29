const Course = require("../models/Course");

class CourseController {
    show(req, res, next) {
        Course.find({}, (err, courses) => {
            if (!err) res.render("courses", { data: courses });
            else next(err);
        });
    }

    create(req, res, next) {
        res.render("courses/create")
    }

    store(req, res, next) {
        const course = new Course(req.body);
        course.save(err => {
            if (!err) res.redirect("/courses");
            else next(err);
        })
    }

    edit(req, res, next) {
        Course.findById(req.query.id, (err, course) => {
            if (!err) res.render("courses/edit", { data: course });
            else next(err);
        })
    }

    update(req, res, next) {
        Course.updateOne({ _id: req.query.id }, req.body, err => {
            if (!err) res.redirect("/courses");
            else next(err);
        })
    }

    delete(req, res, next) {
        Course.deleteOne({ _id: req.query.id }, err => {
            if (!err) res.redirect("/courses");
            else next(err);
        })
    }

    search(req, res, next) {
        Course.find({ name: { $regex: req.query.qq, $options: 'i' } }, (err, courses) => {
            if (!err) {
                res.render("courses", { data: courses });
            } else next(err);
        });
    }
}
module.exports = new CourseController();