const Seeall = require("../models/Seeall");
const date = require("../utils/dateHandler");
const View = require("../models/Seeall");
// const date = require("../utils/dateHandler");
const fs = require("fs");
const Trainee = require("../models/Trainee");

class SeeallController {
    show(req, res, next) {
        Seeall.find({}, (err, seealls) => {
            if (!err) res.render("seeall", { data: seealls });
            else next(err);
        });
    }

    create(req, res, next) {
        res.render("seeall/create")
    }

    store(req, res, next) {
        const obj = {
            code: req.body.code,
            name: req.body.name,
            coursecategory: req.body.coursecategory,
            trainer: req.body.trainer,
            createAt: date.convertDateAsString(req.body.createAt),
            updateAt: date.convertDateAsString(req.body.updateAt),
            total: req.body.total,
        }

        const seeall = new Seeall(obj);
        seeall.save(err => {
            if (!err) res.redirect("/seeall");
            else next(err);
        });
    }

    edit(req, res, next) {
        Seeall.findById(req.query.id, (err, seealls) => {
            if (!err) res.render("seeall/edit", { data: seealls });
            else next(err);
        });
    }

    update(req, res, next) {
        const obj = {
            code: req.body.code,
            name: req.body.name,
            category: req.body.category,
            trainer: req.body.trainer,
            createAt: date.convertDateAsString(req.body.createAt),
            updateAt: date.convertDateAsString(req.body.updateAt),
            total: req.body.total,
        }

        Seeall.updateOne({ _id: req.query.id }, obj, err => {
            if (!err) res.redirect("/seeall");
            else next(err);
        });
    }

    delete(req, res, next) {
        Seeall.deleteOne({ _id: req.query.id }, err => {
            if (!err) res.redirect("/seeall");
            else next(err);
        });
    }

    search(req, res, next) {
        Seeall.find({$or:[{name: {$regex: req.query.q, $options: 'i'}},{trainer:{$regex: req.query.q, $options: 'i'}}]}, (err, seealls) => {
            if (!err) {
                res.render("seeall", { data: seealls });
            }
            else next(err);
        });
    }
//-----------------------------------------
    showviewtrainee(req, res, next) {
        View.find({}, (err, views) => {
            if (!err) res.render("seeall/view", { data1: views });
            else next(err);
        });
    }
    create(req, res, next) {
        res.render("seeall/create")
    }

    storeviewtrainee(req, res, next) {
        try{
            const trainee = {
                dob: date.convertDateAsString(req.body.dob),
                image: {
                    data: fs.readFileSync(req.file.path),
                    contentType: "image/png"
                }
            }
            const obj = {
                code: req.body.code,
                name: req.body.name,
                
            }
            const view = new View(obj);
            trainee.save();
            view.save();
        }
        catch(err){
            console.log(err);
            return next(err);
        }
        res.redirect("/seeall/viewtrainee");
    }

    // edit(req, res, next) {
    //     Seeall.findById(req.query.id, (err, seealls) => {
    //         if (!err) res.render("seeall/edit", { data: seealls });
    //         else next(err);
    //     });
    // }

    // update(req, res, next) {
    //     const obj = {
    //         code: req.body.code,
    //         name: req.body.name,
    //         category: req.body.category,
    //         trainer: req.body.trainer,
    //         createAt: date.convertDateAsString(req.body.createAt),
    //         updateAt: date.convertDateAsString(req.body.updateAt),
    //         total: req.body.total,
    //     }

    //     Seeall.updateOne({ _id: req.query.id }, obj, err => {
    //         if (!err) res.redirect("/seeall");
    //         else next(err);
    //     });
    // }

    deleteviewtrainee(req, res, next) {
        View.deleteOne({ _id: req.query.id }, err => {
            if (!err) res.redirect("/seeall/view");
            else next(err);
        });
        // try {
        //     const deletedTrainee = await Trainee.findByIdAndDelete(req.query.id);
        //     // const filename = deletedTrainee.image.name;
        //     // if(filename) fs.unlinkSync(path.join(traineeUploads, filename));
        //     await Trainee.deleteOne({email: deletedTrainee.email});
        // } catch (err) {
        //     console.log(err);
        //     return next(err);
        // }
        // res.redirect("/seeall/view");
    }

    search(req, res, next) {
        Seeall.find({$or:{name: {$regex: req.query.q, $options: 'i'}}}, (err, seealls) => {
            if (!err) {
                res.render("seeall", { data: seealls });
            }
            else next(err);
        });
    }
}

module.exports = new SeeallController();