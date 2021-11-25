const Admin = require("../models/Admin");

class AdminController {
    index(req, res) {
        res.render("admin");
    }

    create(req, res) {
        res.render("admin/slider");
    }
}

module.exports = new AdminController();