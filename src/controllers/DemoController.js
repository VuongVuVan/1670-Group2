const Demo = require("../models/Demo");

class DemoController {
    show(req, res, next) {
        Demo.find({}, (err, demos) => {
            if (!err) res.render("demo", { data: demos });
            else next(err);
        });
    }

    create(req, res, next) {
        res.render("demo/create")
    }

    store(req, res, next) {
        const demo = new Demo(req.body);
        demo.save(err => {
            if (!err) res.redirect("/demo");
            else next(err);
        });
    }

    edit(req, res, next) {
        Demo.findById(req.query.id, (err, demo) => {
            if (!err) res.render("demo/edit", { data: demo });
            else next(err);
        });
    }

    update(req, res, next) {
        Demo.updateOne({ _id: req.query.id }, req.body, err => {
            if (!err) res.redirect("/demo");
            else next(err);
        });
    }

    delete(req, res, next) {
        Demo.deleteOne({ _id: req.query.id }, err => {
            if (!err) res.redirect("/demo");
            else next(err);
        });
    }

    search(req, res, next) {
        Demo.find({name: {$regex: req.query.q, $options: 'i'}}, (err, demos) => {
            if (!err) {
                res.render("demo", { data: demos });
            }
            else next(err);
        });
    }
}

module.exports = new DemoController();