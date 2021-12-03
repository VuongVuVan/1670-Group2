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
        const account = new Account({
            email: req.body.email,
            role: "admin"
        });
        let admin;
        if(req.file) {
            admin = new Admin({
                email: req.body.email,
                image: {
                    data: fs.readFileSync(req.file.path),
                    contentType: "image/png"
                },
                name: req.body.name,
                age: date.calculateAge(req.body.dob),
                dob: date.convertDateAsString(req.body.dob),
                address: req.body.address
            });
        }
        account.save(err => {
            if (err) return next(err);
        });
        admin.save(err => {
            if (!err) res.redirect("/admin/admin-accounts");
            else next(err);
        });
    }

    edit(req, res, next) {
        Admin.findById(req.query.id, (err, admin) => {
            if (!err) res.render("admin/edit", {admin});
            else next(err);
        });
    }

    update(req, res, next) {
        const account = {email: req.body.email};
        let admin;
        if(req.file) {
            admin = {
                email: req.body.email,
                image: {
                    data: fs.readFileSync(req.file.path),
                    contentType: "image/png"
                },
                name: req.body.name,
                age: date.calculateAge(req.body.dob),
                dob: date.convertDateAsString(req.body.dob),
                address: req.body.address
            };
        }else {
            admin = {
                email: req.body.email,
                name: req.body.name,
                age: date.calculateAge(req.body.dob),
                dob: date.convertDateAsString(req.body.dob),
                address: req.body.address
            }
        }
        Account.updateOne({email: req.body.email}, account, err => {
            if(err) next(err);
        });
        Admin.updateOne({_id: req.query.id}, admin, err => {
            if(!err) res.redirect("/admin/admin-accounts");
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