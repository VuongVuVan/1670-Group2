const Admin = require("../models/Admin");
const Account = require("../models/Account");
const date = require("../utils/dateHandler");
const fs = require("fs");
const path = require("path");
const { encrypt } = require("../utils/hashingHandler");
const defaultPassword = "123456789";
const defaultAvatar = path.join(__dirname, "../public/images/avatar/avatar.png");

class AdminController {
    indexAction(req, res, next) {
        res.render("admin", {user: req.session.user});
    }
    
    showAdminAccounts(req, res, next) {
        Admin.find({}, (err, admins) => {
            if(!err) res.render("admin/admin-accounts", {admins, user: req.session.user});
            else next(err);
        });
    }

    async storeAdminAccount(req, res, next) {
        try {
            const account = new Account({
                email: req.body.email,
                password: await encrypt(defaultPassword),
                role: "admin"
            });
            const data = (req.file) ? fs.readFileSync(req.file.path) : fs.readFileSync(defaultAvatar);
            const admin = new Admin({
                email: req.body.email,
                image: {
                    data: data,
                    contentType: "image/png"
                },
                name: req.body.name,
                dob: date.convertDateAsString(req.body.dob),
                address: req.body.address
            });
            account.save();
            admin.save();
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/admin/admin-accounts");
    }

    editAdminAccount(req, res, next) {
        Admin.findById(req.query.id, (err, admin) => {
            if (!err) res.render("admin/edit", {admin, user: req.session.user});
            else next(err);
        });
    }

    async updateAdminAccount(req, res, next) {
        const newAccount = {email: req.body.email};
        let newAdmin;
        if(req.file) {
            newAdmin = {
                email: req.body.email,
                image: {
                    data: fs.readFileSync(req.file.path),
                    contentType: "image/png"
                },
                name: req.body.name,
                dob: date.convertDateAsString(req.body.dob),
                address: req.body.address
            }
        }else {
            newAdmin = {
                email: req.body.email,
                name: req.body.name,
                dob: date.convertDateAsString(req.body.dob),
                address: req.body.address
            }
        }
        try {
            await Account.updateOne({email: req.body.email}, newAccount);
            await Admin.updateOne({_id: req.query.id}, newAdmin);
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/admin/admin-accounts");
    }

    async deleteAdminAccount(req, res, next) {
        try {
            const deletedAdmin = await Admin.findByIdAndDelete(req.query.id);
            await Account.deleteOne({email: deletedAdmin.email});
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/admin/admin-accounts");
    }
}

module.exports = new AdminController();