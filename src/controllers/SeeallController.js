const Seeall = require("../models/Seeall");

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
        const seeall = new Seeall(req.body);
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
        Seeall.updateOne({ _id: req.query.id }, req.body, err => {
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
        Seeall.find({name: {$regex: req.query.q, $options: 'i'}}, (err, seealls) => {
            if (!err) {
                res.render("seeall", { data: seealls });
            }
            else next(err);
        });
    }
}

module.exports = new SeeallController();