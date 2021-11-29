const Trainer = require("../models/Trainer");

class TrainerController {
    index(req, res) {
        res.render("trainer");
    }

    create(req, res) {
        res.render("trainer/create");
    }

    test(req, res) {
        res.render("trainer/test");
    }
}
module.exports = new TrainerController();