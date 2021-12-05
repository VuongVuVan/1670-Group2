const Admin = require("../models/Admin");
const Account = require("../models/Account");
const date = require("../utils/dateHandler");
const fs = require("fs");

class AdminController {
    indexAction(req, res, next) {
        res.render("admin", {user: req.session.user});
    }
    
    showAction(req, res, next) {
        Admin.find({}, (err, admins) => {
            if(!err) res.render("admin/admin-accounts", {admins, user: req.session.user});
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
            if(err) return next(err);
        });
        Admin.updateOne({_id: req.query.id}, admin, err => {
            if(!err) res.redirect("/admin/admin-accounts");
            else next(err);
        });
    }

    async delete(req, res, next) {
        const deletedAdmin = await Admin.findByIdAndDelete(req.query.id).catch(err => {
            console.log(err);
            return next(err);
        });
        Account.deleteOne({email: deletedAdmin.email}, err => {
            if (!err) res.redirect("/admin/admin-accounts");
            else next(err);
        });
    }
}

module.exports = new AdminController();