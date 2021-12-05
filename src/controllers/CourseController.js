const Course = require("../models/Course");
const Category = require("../models/Category");
const date = require("../utils/dateHandler");

class CourseController {
    show(req, res, next) {
        Course.find({}, (err, courses) => {
            Category.find({}, (err, categories) => {
                if (!err) res.render("courses", { data: categories, data1: courses });
                else next(err);
            })
        });
    }


    create(req, res, next) {
        res.render("courses/create")
    }

    store(req, res, next) {
        const obj = {
            code: req.body.code,
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            session: req.body.session,
            createAt: date.convertDateAsString(req.body.createAt),
            updateAt: date.convertDateAsString(req.body.updateAt),
        }
        console.log(obj)
        const course = new Course(obj);
        course.save(err => {
            if (!err) res.redirect("/courses");
            else next(err);
        });
    }

    edit(req, res, next) {
        Course.findById(req.query.id, (err, course) => {
            Category.find({}, (err, categories) => {
                if (!err) res.render("courses/edit", { data: categories, data1: course });
                else next(err);
            })
        });
    }

    update(req, res, next) {
        const obj = {
            code: req.body.code,
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            session: req.body.session,
            createAt: date.convertDateAsString(req.body.createAt),
            updateAt: date.convertDateAsString(req.body.updateAt),
        }
        Course.updateOne({ _id: req.query.id }, obj, err => {
            console.log(obj)
            if (!err) res.redirect("/courses");
            else next(err);
        });
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
                res.render("courses", { data1: courses });
            } else next(err);
        });
    }
}
module.exports = new CourseController();