const Trainee = require("../models/Admin");

class TraineeController {
    index(req, res) {
        res.render("trainee");
    }

    create(req, res) {
        res.render("trainee/create");
    }

    test(req, res) {
        res.render("trainee/test");
    }
}

module.exports = new TraineeController();