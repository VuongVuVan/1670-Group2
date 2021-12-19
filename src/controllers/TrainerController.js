const Trainer = require("../models/Trainer");
const fs = require("fs");
const path = require("path");
const avatarPath = path.join(__dirname, "../public/uploads/trainer");
const CourseClass = require("../models/CourseClass")
const Trainee = require("../models/Trainee");

class TrainerController {
    index(req, res) {
        res.render("trainer", { user: req.session.user });
    }

    view(req, res) {
        CourseClass.findById({ _id: req.query.id }, (err, courseClass) => {
            const mapTraineeId = courseClass.trainees.map(item => item.trainee_code)
            console.log(mapTraineeId)
            Trainee.find({ trainee_code: { $in: mapTraineeId } }, (err, docs) => {
                console.log(docs[0])
                if (!err) res.render("trainer/viewclass", { data: docs });
                else next(err);
            })
        });
    }

    showViewGrade(req, res) {
        Grade.find({}, (err, grade) => {
            console.log(grade)
            const total = grade.length;
            if (!err) res.render("trainer/viewGrade", { data: grade, total });
            else next(err);
        });
    }

    showAssignedCourses(req, res) {
        CourseClass.find({ $orderBy: { position: 1 } }, (err, courseClasses) => {
            const total = courseClasses.length;
            if (!err) res.render("trainer/assignedCourses", { data: courseClasses });
            else next(err);
        });
    }

}

module.exports = new TrainerController();