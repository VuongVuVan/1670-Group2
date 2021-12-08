const Admin = require("../models/Admin");
const Staff = require("../models/Staff");
const Trainer = require("../models/Trainer");
const Account = require("../models/Account");
const date = require("../utils/dateHandler");
const fs = require("fs");
const path = require("path");
const { encrypt } = require("../utils/hashingHandler");
const defaultPassword = "123456789";
const defaultAvatar = path.join(__dirname, "../public/images/avatar/avatar.png");
const adminUploads = path.join(__dirname, "../public/uploads/admins");
const staffUploads = path.join(__dirname, "../public/uploads/staffs");
const trainerUploads = path.join(__dirname, "../public/uploads/trainers");

class AdminController {
    indexAction(req, res, next) {
        res.render("admin", {user: req.session.user});
    }

    // =================================================================== //
    // =====================Admin Accounts Management===================== //
    // =================================================================== //

    showAdminAccounts(req, res, next) {
        Admin.find({}, (err, admins) => {
            const total = admins.length;
            const user = req.session.user;
            if(!err) res.render("admin/admin-accounts", {admins, user, total});
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
            const filename = (req.file) ? req.file.filename : "";
            const admin = new Admin({
                email: req.body.email,
                image: {
                    data: data,
                    contentType: "image/png",
                    name: filename
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
            if (!err) res.render("admin/editAdmin", {admin, user: req.session.user});
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
                    contentType: "image/png",
                    name: req.file.filename
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
            const filename = deletedAdmin.image.name;
            if(filename) fs.unlinkSync(path.join(adminUploads, filename));
            await Account.deleteOne({email: deletedAdmin.email});
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/admin/admin-accounts");
    }

    async setDefaultPassA(req, res, next) {
        try {
            const anAdmin = await Admin.findById({_id: req.query.id});
            const passwordHash = await encrypt(defaultPassword);
            const obj = {password: passwordHash};
            await Account.updateOne({email: anAdmin.email}, obj);
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/admin/admin-accounts");
    } 

    // =================================================================== //
    // =====================Staff Accounts Management===================== //
    // =================================================================== //
    
    showStaffAccounts(req, res, next) {
        Staff.find({}, (err, staffs) => {
            const total = staffs.length;
            const user = req.session.user;
            if(!err) res.render("admin/staff-accounts", {staffs, user, total});
            else next(err);
        });
    }

    async storeStaffAccount(req, res, next) {
        try {
            const account = new Account({
                email: req.body.email,
                password: await encrypt(defaultPassword),
                role: "staff"
            });
            const data = (req.file) ? fs.readFileSync(req.file.path) : fs.readFileSync(defaultAvatar);
            const filename = (req.file) ? req.file.filename : "";
            const staff = new Staff({
                email: req.body.email,
                image: {
                    data: data,
                    contentType: "image/png",
                    name: filename
                },
                name: req.body.name,
                dob: date.convertDateAsString(req.body.dob),
                address: req.body.address
            });
            account.save();
            staff.save();
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/admin/staff-accounts");
    }

    editStaffAccount(req, res, next) {
        Staff.findById(req.query.id, (err, staff) => {
            if (!err) res.render("admin/editStaff", {staff, user: req.session.user});
            else next(err);
        });
    }

    async updateStaffAccount(req, res, next) {
        const newAccount = {email: req.body.email};
        let newStaff;
        if(req.file) {
            newStaff = {
                email: req.body.email,
                image: {
                    data: fs.readFileSync(req.file.path),
                    contentType: "image/png",
                    name: req.file.filename
                },
                name: req.body.name,
                dob: date.convertDateAsString(req.body.dob),
                address: req.body.address
            }
        }else {
            newStaff = {
                email: req.body.email,
                name: req.body.name,
                dob: date.convertDateAsString(req.body.dob),
                address: req.body.address
            }
        }
        try {
            await Account.updateOne({email: req.body.email}, newAccount);
            await Staff.updateOne({_id: req.query.id}, newStaff);
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/admin/staff-accounts");
    }

    async deleteStaffAccount(req, res, next) {
        try {
            const deletedStaff = await Staff.findByIdAndDelete(req.query.id);
            const filename = deletedStaff.image.name;
            if(filename) fs.unlinkSync(path.join(staffUploads, filename));
            await Account.deleteOne({email: deletedStaff.email});
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/admin/staff-accounts");
    }

    async setDefaultPassS(req, res, next) {
        try {
            const aStaff = await Staff.findById({_id: req.query.id});
            const passwordHash = await encrypt(defaultPassword);
            const obj = {password: passwordHash};
            await Account.updateOne({email: aStaff.email}, obj);
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/admin/staff-accounts");
    } 
}

module.exports = new AdminController();