const Trainer = require("../models/Trainer");
const fs = require("fs");
const path = require("path");
const avatarPath = path.join(__dirname, "../public/uploads/trainer");
const CourseClass = require("../models/CourseClass")

class TrainerController {
    index(req, res) {
        res.render("trainer");
    }

    view(req, res) {
        CourseClass.findById({ _id: req.query.id }, (err, courseClass) => {
            if (!err) res.render("trainer/viewclass", { data: courseClass.trainees });
            else next(err);
        });
    }

    showAssignedCourses(req, res) {
        CourseClass.find({}, (err, courseClasses) => {
            console.log(courseClasses)
            const total = courseClasses.length;
            if (!err) res.render("trainer/assignedCourses", { data: courseClasses, total });
            else next(err);
        });
    }

    grade(req, res) {
        CourseClass.find({}, (err, courseClasses) => {
            console.log(courseClasses)
            const total = courseClasses.length;
            if (!err) res.render("trainer/viewclass", { students: courseClasses, total });
            else next(err);
        });
    }
}

module.exports = new TrainerController();