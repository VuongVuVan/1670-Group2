const Admin = require("../models/Admin");
const Staff = require("../models/Staff");
const Trainer = require("../models/Trainer");
const Account = require("../models/Account");
const date = require("../utils/dateHandler");
const fs = require("fs");
const path = require("path");
const {encrypt} = require("../utils/hashingHandler");
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
            if(!err) {
                res.render("admin/admin-accounts", {
                    admins, 
                    user: req.session.user,
                    total: admins.length
                });
            }else next(err);
        });
    }

    async storeAdminAccount(req, res, next) {
        try {
            const email = req.body.email.replace(/\s/g, "");
            const anAccount = await Account.findOne({email});
            if(anAccount) {
                return res.render("admin/admin-accounts", {
                    user: req.session.user,
                    msg: "This email address already has an account.", 
                    attr: "display: flex;",
                });
            }
            let name = req.body.name.replace(/\s/g, " ");
            name = name.match(/[^ ].*[^ ]/)[0];
            let address = req.body.address.replace(/\s/g, " ");
            address = address.match(/[^ ].*[^ ]/)[0];
            const account = new Account({
                email,
                password: await encrypt(defaultPassword),
                role: "admin"
            });
            const data = req.file ? fs.readFileSync(req.file.path) : fs.readFileSync(defaultAvatar);
            const filename = (req.file) ? req.file.filename : "";
            const admin = new Admin({
                email,
                image: {
                    data: data,
                    contentType: "image/png",
                    name: filename
                },
                name,
                dob: date.convertDateAsString(req.body.dob),
                address
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
        let name = req.body.name.replace(/\s/g, " ");
        name = name.match(/[^ ].*[^ ]/)[0];
        let address = req.body.address.replace(/\s/g, " ");
        address = address.match(/[^ ].*[^ ]/)[0];
        if(req.file) {
            newAdmin = {
                email: req.body.email,
                image: {
                    data: fs.readFileSync(req.file.path),
                    contentType: "image/png",
                    name: req.file.filename
                },
                name,
                dob: date.convertDateAsString(req.body.dob),
                address
            }
        }else {
            newAdmin = {
                email: req.body.email,
                name,
                dob: date.convertDateAsString(req.body.dob),
                address
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

    searchAdminAccounts(req, res, next) {
        if(!req.query.q) return res.redirect("/admin/admin-accounts");
        const keyword = {$regex: req.query.q, $options: 'i'};
        Admin.find({$or: [{email: keyword}, {name: keyword}]}, (err, admins) => {
            if (!err) {
                res.render("admin/admin-accounts", {
                    admins, 
                    user: req.session.user,
                    total: admins.length, 
                    q: req.query.q
                });
            }
            else next(err);
        });
    }

    test(req, res) {
        res.render("admin/test");
    }

    // =================================================================== //
    // =====================Staff Accounts Management===================== //
    // =================================================================== //
    
    showStaffAccounts(req, res, next) {
        Staff.find({}, (err, staffs) => {
            if(!err) {
                res.render("admin/staff-accounts", {
                    staffs, 
                    user: req.session.user,
                    total: staffs.length,
                });
            }else next(err);
        });
    }

    async storeStaffAccount(req, res, next) {
        try {
            const email = req.body.email.replace(/\s/g, "");
            const anAccount = await Account.findOne({email});
            if(anAccount) {
                return res.render("admin/staff-accounts", {
                    user: req.session.user,
                    msg: "This email address already has an account.", 
                    attr: "display: flex;",
                });
            }
            let name = req.body.name.replace(/\s/g, " ");
            name = name.match(/[^ ].*[^ ]/)[0];
            let address = req.body.address.replace(/\s/g, " ");
            address = address.match(/[^ ].*[^ ]/)[0];
            const account = new Account({
                email,
                password: await encrypt(defaultPassword),
                role: "staff"
            });
            const data = req.file ? fs.readFileSync(req.file.path) : fs.readFileSync(defaultAvatar);
            const filename = req.file ? req.file.filename : "";
            const staff = new Staff({
                email,
                image: {
                    data: data,
                    contentType: "image/png",
                    name: filename
                },
                name,
                dob: date.convertDateAsString(req.body.dob),
                address
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
        let name = req.body.name.replace(/\s/g, " ");
        name = name.match(/[^ ].*[^ ]/)[0];
        let address = req.body.address.replace(/\s/g, " ");
        address = address.match(/[^ ].*[^ ]/)[0];
        if(req.file) {
            newStaff = {
                email: req.body.email,
                image: {
                    data: fs.readFileSync(req.file.path),
                    contentType: "image/png",
                    name: req.file.filename
                },
                name,
                dob: date.convertDateAsString(req.body.dob),
                address
            }
        }else {
            newStaff = {
                email: req.body.email,
                name,
                dob: date.convertDateAsString(req.body.dob),
                address
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

    searchStaffAccounts(req, res, next) {
        if(!req.query.q) return res.redirect("/admin/staff-accounts");
        const keyword = {$regex: req.query.q, $options: 'i'};
        Staff.find({$or: [{email: keyword}, {name: keyword}]}, (err, staffs) => {
            if (!err) {
                res.render("admin/staff-accounts", {
                    staffs, 
                    user: req.session.user,
                    total: staffs.length, 
                    q: req.query.q
                });
            }
            else next(err);
        });
    }

    // =================================================================== //
    // ====================Trainer Accounts Management==================== //
    // =================================================================== //
    
    showTrainerAccounts(req, res, next) {
        Trainer.find({}, (err, trainers) => {
            const total = trainers.length;
            const user = req.session.user;
            if(!err) res.render("admin/trainer-accounts", {trainers, user, total});
            else next(err);
        });
    }

    async storeTrainerAccount(req, res, next) {
        try {
            const email = req.body.email.replace(/\s/g, "");
            const anAccount = await Account.findOne({email});
            if(anAccount) {
                return res.render("admin/staff-accounts", {
                    user: req.session.user,
                    msg: "This email address already has an account.", 
                    attr: "display: flex;",
                });
            }
            let name = req.body.name.replace(/\s/g, " ");
            name = name.match(/[^ ].*[^ ]/)[0];
            let address = req.body.address.replace(/\s/g, " ");
            address = address.match(/[^ ].*[^ ]/)[0];
            let specialty = req.body.specialty.replace(/\s/g, " ");
            specialty = specialty.match(/[^ ].*[^ ]/)[0];
            let code = req.body.code.replace(/\s/g, " ");
            code = code.match(/[^ ].*[^ ]/)[0];
            const account = new Account({
                email,
                password: await encrypt(defaultPassword),
                role: "trainer"
            });
            const data = req.file ? fs.readFileSync(req.file.path) : fs.readFileSync(defaultAvatar);
            const filename = (req.file) ? req.file.filename : "";
            const trainer = new Trainer({
                email,
                image: {
                    data: data,
                    contentType: "image/png",
                    name: filename
                },
                name,
                code,
                dob: date.convertDateAsString(req.body.dob),
                address,
                specialty
            });
            account.save();
            trainer.save();
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/admin/trainer-accounts");
    }

    editTrainerAccount(req, res, next) {
        Trainer.findById(req.query.id, (err, trainer) => {
            if (!err) res.render("admin/editTrainer", {trainer, user: req.session.user});
            else next(err);
        });
    }

    async updateTrainerAccount(req, res, next) {
        const newAccount = {email: req.body.email};
        let newTrainer;
        let name = req.body.name.replace(/\s/g, " ");
        name = name.match(/[^ ].*[^ ]/)[0];
        let address = req.body.address.replace(/\s/g, " ");
        address = address.match(/[^ ].*[^ ]/)[0];
        let specialty = req.body.specialty.replace(/\s/g, " ");
        specialty = specialty.match(/[^ ].*[^ ]/)[0];
        let code = req.body.code.replace(/\s/g, " ");
        code = code.match(/[^ ].*[^ ]/)[0];
        if(req.file) {
            newTrainer = {
                email: req.body.email,
                image: {
                    data: fs.readFileSync(req.file.path),
                    contentType: "image/png",
                    name: req.file.filename
                },
                name,
                code,
                dob: date.convertDateAsString(req.body.dob),
                address,
                specialty
            }
        }else {
            newTrainer = {
                email: req.body.email,
                name,
                code,
                dob: date.convertDateAsString(req.body.dob),
                address,
                specialty
            }
        }
        try {
            await Account.updateOne({email: req.body.email}, newAccount);
            await Trainer.updateOne({_id: req.query.id}, newTrainer);
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/admin/trainer-accounts");
    }

    async deleteTrainerAccount(req, res, next) {
        try {
            const deletedTrainer = await Trainer.findByIdAndDelete(req.query.id);
            const filename = deletedTrainer.image.name;
            if(filename) fs.unlinkSync(path.join(trainerUploads, filename));
            await Account.deleteOne({email: deletedTrainer.email});
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/admin/trainer-accounts");
    }

    async setDefaultPassTer(req, res, next) {
        try {
            const aTrainer = await Trainer.findById({_id: req.query.id});
            const passwordHash = await encrypt(defaultPassword);
            const obj = {password: passwordHash};
            await Account.updateOne({email: aTrainer.email}, obj);
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/admin/trainer-accounts");
    }

    searchTrainerAccounts(req, res, next) {
        if(!req.query.q) return res.redirect("/admin/trainer-accounts");
        const keyword = {$regex: req.query.q, $options: 'i'};
        Trainer.find({$or: [{email: keyword}, {name: keyword}]}, (err, trainers) => {
            if (!err) {
                res.render("admin/trainer-accounts", {
                    trainers, 
                    user: req.session.user,
                    total: trainers.length, 
                    q: req.query.q
                });
            }
            else next(err);
        });
    }
}

module.exports = new AdminController();