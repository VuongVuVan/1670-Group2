const Admin = require("../models/Admin");

class AdminController {
    index(req, res) {
        res.render("admin");
    }

    create(req, res) {
        res.render("admin/create");
    }
}

module.exports = new AdminController();