const Admin = require("../models/Admin");

class AdminController {
    index(req, res) {
        res.render("admin");
    }

    create(req, res) {
        res.render("admin/create");
    }

    test(req, res) {
        res.render("admin/test");
    }
}

module.exports = new AdminController();