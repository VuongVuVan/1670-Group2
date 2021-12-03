const Trainer = require("../models/Trainer");
const fs = require("fs");
const path = require("path");
const avatarPath = path.join(__dirname, "../public/uploads/trainer");

class TrainerController {
    show(req, res, next) {
        Trainer.find({}, (err, trainer) => {
            if (!err) res.render("demo/index", { data: trainer });
            else next(err);
        });
    }

    create(req, res, next) {
        res.render("trainer/create")
    }

    store(req, res, next) {
        const obj = {
            name: req.body.name,
            description: req.body.description,
            image: {
                data: fs.readFileSync(path.join(avatarPath, req.file.filename)),
                contentType: "image/png"
            }
        }

        const trainer = new Trainer(obj);
        trainer.save(err => {
            if (!err) res.redirect("/trainer");
            else next(err);
        });
    }

    edit(req, res, next) {
        Trainer.findById(req.query.id, (err, trainer) => {
            if (!err) res.render("trainer/edit", { data: trainer });
            else next(err);
        });
    }

    update(req, res, next) {
        Trainer.updateOne({ _id: req.query.id }, req.body, err => {
            if (!err) res.redirect("/trainer");
            else next(err);
        });
    }

    delete(req, res, next) {
        Trainer.deleteOne({ _id: req.query.id }, err => {
            if (!err) res.redirect("/trainer");
            else next(err);
        });
    }

    search(req, res, next) {
        Trainer.find({ name: { $regex: req.query.q, $options: 'i' } }, (err, trainer) => {
            if (!err) {
                res.render("trainer", { data: trainer });
            } else next(err);
        });
    }
}

module.exports = new TrainerController();