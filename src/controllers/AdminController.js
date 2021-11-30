const Admin = require("../models/Admin");
const Account = require("../models/Account");

class AdminController {
    index(req, res) {
        res.render("admin");
    }

    showAction(req, res, next) {
        Admin.find({}, (err, admins) => {
            if(!err) res.render("admin/admin-accounts", {admins});
            else next(err);
        });
    }

    store(req, res, next) {
        const account = new Account({
            email: req.body.email,
            password: req.body.password,
            role: "admin"
        });
        const admin = new Admin({
            email: req.body.email,
            name: req.body.name,
            dob: req.body.dob,
            address: req.body.address
        });
        account.save(err => {
            // if (!err) res.redirect("/admin/admin-accounts");
            // else next(err);
        });
        admin.save(err => {
            if (!err) res.redirect("/admin/admin-accounts");
            else next(err);
        });
    }

    edit(req, res, next) {
        Account.findById(req.query.id, (err, account) => {
            if (!err) res.render("admin/edit", {account});
            else next(err);
        });
    }
}

module.exports = new AdminController();