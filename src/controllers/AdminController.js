const Admin = require("../models/Admin");
const Account = require("../models/Account");
const date = require("../utils/dateHandler");
const fs = require("fs");
const path = require("path");
const destination = path.join(__dirname, "../public/uploads/admins");

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
        console.log(req.file)
        const account = new Account({
            email: req.body.email,
            role: "admin"
        });
        const admin = new Admin({
            email: req.body.email,
            image: {
                data: fs.readFileSync(path.join(destination, req.file.filename)),
                contentType: "image/png"
            },
            name: req.body.name,
            age: date.calculateAge(req.body.dob),
            dob: date.convertDateAsString(req.body.dob),
            address: req.body.address
        });
        account.save(err => {
            if (err) return next(err);
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

    delete(req, res, next) {
        Admin.deleteOne({ _id: req.query.id }, err => {
            if (!err) res.redirect("/admin/admin-accounts");
            else next(err);
        });
    }
}

module.exports = new AdminController();