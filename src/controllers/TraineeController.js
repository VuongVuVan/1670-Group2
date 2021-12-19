const Trainee = require("../models/Trainee");
const fs = require("fs");
const path = require("path");
const date = require("../utils/dateHandler");
const defaultPassword = "123456789";
const { encrypt } = require("../utils/hashingHandler");
const Account = require("../models/Account");
const Traineecourse = require("../models/Course");
const Traineegrade = require("../models/Grade");
const Curriculum = require("../models/Seeall");


// const fs = require("fs");
// const defaultAvatar = path.join(__dirname, "../public/images/avatar/avatar.png");

class TraineeController {
    index(req, res) {
        res.render("trainee", { user: req.session.user });
    }

    // layout(req, res) {
    //     res.render("trainee/layout");
    // }

    show(req, res, next) {
        Trainee.find({}, (err, trainees) => {
            if (!err) res.render("trainee/view-alltrainee", { data: trainees, user: req.session.user });
            else next(err);
        });
    }


    edit(req, res, next) {
        Trainee.findById(req.query.id, (err, trainees) => {
            if (!err) res.render("trainee/view-alltrainee", { data: trainees, user: req.session.user });
            else next(err);
        });
    }
    store(req, res, next) {
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
 
        const trainee = new Trainee(obj);
        trainee.save(err => {
            if (!err) res.redirect("/trainee/view-alltrainee");
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
            if (!err) res.redirect("/trainee/view-alltrainee");
            else next(err);
        });
    }

    // ------------Show design course--------------
    // --------------------------------------------
    // --------------------------------------------
    // --------------------------------------------
    // --------------------------------------------
    showdesignatedcourse(req, res, next) {
        Traineecourse.find({}, (err, designatedcourses) => {
            if (!err) res.render("trainee/designatedcourse", { data1: designatedcourses, user: req.session.user });
            else next(err);
        });
    }
    storedesignatedcourse(req, res, next) {
        const obj = {
            code: req.body.code,
            name: req.body.name,
            trainer: req.body.trainer,
            createAt: date.convertDateAsString(req.body.createAt),
            updateAt: date.convertDateAsString(req.body.updateAt),
            total: req.body.total,
        }
 
        const traineecourse = new Traineecourse(obj);
        traineecourse.save(err => {
            if (!err) res.redirect("/trainee/designatedcourse");
            else next(err);
        });
    }

    editdesignatedcourse(req, res, next) {
        Traineecourse.findById(req.query.id, (err, designatedcourses) => {
            if (!err) res.render("trainee/edit", { data1: designatedcourses });
            else next(err);
        });
    }

    updatedesignatedcourse(req, res, next) {
        const obj = {
            code: req.body.code,
            name: req.body.name,
            trainer: req.body.trainer,
            createAt: date.convertDateAsString(req.body.createAt),
            updateAt: date.convertDateAsString(req.body.updateAt),
            total: req.body.total,
        }

        Traineecourse.updateOne({ _id: req.query.id }, obj, err => {
            if (!err) res.redirect("/trainee/designatedcourse");
            else next(err);
        });
    }

    deletedesignatedcourse(req, res, next) {
        Traineecourse.deleteOne({ _id: req.query.id }, err => {
            if (!err) res.redirect("/trainee/designatedcourse");
            else next(err);
        });
    }

    searchdesignatedcourse(req, res, next) {
        Traineecourse.find({$or:[{name: {$regex: req.query.q, $options: 'i'}},{trainer:{$regex: req.query.q, $options: 'i'}}]}, (err, designatedcourses) => {
            if (!err) {
                res.render("trainee/designatedcourse", { data1: designatedcourses, user: req.session.user });
            }
            else next(err);
        });
    }

    // --------------View Grade--------------------
    // --------------------------------------------
    // --------------------------------------------
    // --------------------------------------------
    // --------------------------------------------
    showtraineegrade(req, res, next) {
        Traineegrade.find({}, (err, traineegrades) => {
            if (!err) res.render("trainee/view-grade", { data2: traineegrades, user: req.session.user });
            else next(err);
        });
    }
    storetraineegrade(req, res, next) {
        const obj = {
            code: req.body.code,
            name: req.body.name,
            trainer: req.body.trainer,
            class: req.body.class,
            grade: req.body.grade,
        }

        const traineegrade = new Traineegrade(obj);
        traineegrade.save(err => {
            if (!err) res.redirect("/trainee/view-grade");
            else next(err);
        });
    }

    updatetraineegrade(req, res, next) {
        const obj = {
            code: req.body.code,
            name: req.body.name,
            trainer: req.body.trainer,
            class: req.body.class,
            grade: req.body.grade,
        }

        Traineecourse.updateOne({ _id: req.query.id }, obj, err => {
            if (!err) res.redirect("/trainee/view-grade");
            else next(err);
        });
    }

    edittraineegrade(req, res, next) {
        Traineecourse.findById(req.query.id, (err, traineegrades) => {
            if (!err) res.render("trainee/edit", { data2: traineegrades });
            else next(err);
        });
    }

    deletetraineegrade(req, res, next) {
        Traineecourse.deleteOne({ _id: req.query.id }, err => {
            if (!err) res.redirect("/trainee/view-grade");
            else next(err);
        });
    }

    searchtraineegrade(req, res, next) {
        Traineecourse.find({$or:[{name: {$regex: req.query.q, $options: 'i'}},{trainer:{$regex: req.query.q, $options: 'i'}}]}, (err, traineegrades) => {
            if (!err) {
                res.render("trainee/view-grade", { data2: traineegrades, user: req.session.user });
            }
            else next(err);
        });
    }

    // --------------View All Course--------------
    // ----------------------------------------------------------
    // ----------------------------------------------------------
    // ----------------------------------------------------------
    // ----------------------------------------------------------
    showcurriculum(req, res, next) {
        Curriculum.find({}, (err, curriculums) => {
            if (!err) res.render("trainee/curriculum", { data3: curriculums, user: req.session.user });
            else next(err);
        });
    }

    storecurriculum(req, res, next) {
        const obj = {
            code: req.body.code,
            name: req.body.name,
            coursecategory: req.body.coursecategory,
            trainer: req.body.trainer,
            createAt: date.convertDateAsString(req.body.createAt),
            updateAt: date.convertDateAsString(req.body.updateAt),
            total: req.body.total,
        }

        const curriculum = new Curriculum(obj);
        curriculum.save(err => {
            if (!err) res.redirect("/trainee/curriculum");
            else next(err);
        });
    }

    editcurriculum(req, res, next) {
        Curriculum.findById(req.query.id, (err, curriculums) => {
            if (!err) res.render("trainee/curriculum/edit", { data3: curriculums });
            else next(err);
        });
    }

    updatecurriculum(req, res, next) {
        const obj = {
            code: req.body.code,
            name: req.body.name,
            category: req.body.category,
            trainer: req.body.trainer,
            createAt: date.convertDateAsString(req.body.createAt),
            updateAt: date.convertDateAsString(req.body.updateAt),
            total: req.body.total,
        }

        Curriculum.updateOne({ _id: req.query.id }, obj, err => {
            if (!err) res.redirect("/trainee/curriculum");
            else next(err);
        });
    }

    deletecurriculum(req, res, next) {
        Curriculum.deleteOne({ _id: req.query.id }, err => {
            if (!err) res.redirect("/trainee/curriculum");
            else next(err);
        });
    }

    searchcurriculum(req, res, next) {
        Curriculum.find({$or:[{name: {$regex: req.query.q, $options: 'i'}},{trainer:{$regex: req.query.q, $options: 'i'}}]}, (err, curriculums) => {
            if (!err) {
                res.render("trainee/curriculum", { data3: curriculums, user: req.session.user });
            }
            else next(err);
        });
    }

}

module.exports = new TraineeController();