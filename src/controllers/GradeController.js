const Grade = require("../models/Grade");

class GradeController {
    show(req, res, next) {
        Grade.find({}, (err, grades) => {
            if (!err) res.render("grade", { data: grades });
            else next(err);
        });
    }

    create(req, res, next) {
        res.render("grade/create")
    }

    store(req, res, next) {
        const grade = new Grade(req.body);
        grade.save(err => {
            if (!err) res.redirect("/grade");
            else next(err);
        });
    }

    edit(req, res, next) {
        Grade.findById(req.query.id, (err, grades) => {
            if (!err) res.render("grade/edit", { data: grades });
            else next(err);
        });
    }

    // update(req, res, next) {
    //     Seeall.updateOne({ _id: req.query.id }, req.body, err => {
    //         if (!err) res.redirect("/seeall");
    //         else next(err);
    //     });
    // }

    delete(req, res, next) {
        Grade.deleteOne({ _id: req.query.id }, err => {
            if (!err) res.redirect("/grade");
            else next(err);
        });
    }

    // search(req, res, next) {
    //     Seeall.find({name: {$regex: req.query.q, $options: 'i'}}, (err, seealls) => {
    //         if (!err) {
    //             res.render("seeall", { data: seealls });
    //         }
    //         else next(err);
    //     });
    // }
}

module.exports = new GradeController();