const Admin = require("../models/Admin");
const Account = require("../models/Account");

class AdminController {
    index(req, res) {
        res.render("admin");
    }

    showAction(req, res, next) {
        Account.find({}, (err, accounts) => {
            if(!err) res.render("admin/create", {accounts});
            else next(err);
        });
    }

    store(req, res, next) {
        const account = new Account(req.body);
        account.save(err => {
            if (!err) res.redirect("/admin/create");
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