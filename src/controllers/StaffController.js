const Staff = require("../models/Staff");

class StaffController {
    index(req, res) {
        res.render("staff");
    }

    layout(req, res) {
        res.render("staff/layout");
    }
}

module.exports = new StaffController();