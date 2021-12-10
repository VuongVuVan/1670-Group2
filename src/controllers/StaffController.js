const Staff = require("../models/Staff");
const fs = require("fs");
const path = require("path");
const Trainee = require("../models/Trainee");
const Account = require("../models/Account");
const { encrypt } = require("../utils/hashingHandler");
const defaultPassword = "123456789";
const date = require("../utils/dateHandler");
const defaultAvatar = path.join(__dirname, "../public/images/avatar/avatar.png");
const traineeUploads = path.join(__dirname, "../public/uploads/trainees");
const avatarPath = path.join(__dirname, "../public/uploads/demo");

class StaffController {
    index(req, res) {
        res.render("staff");
    }

    show(req, res, next) {
        Staff.find({}, (err, staffs) => {
            const total = staffs.length;
            if (!err) res.render("staff/profile", { data: staffs, total });
            else next(err);
        });
    }

    edit(req, res, next) {
        Staff.findById(req.query.id, (err, staffs) => {
            if (!err) res.render("staff/edit", { data: staffs });
            else next(err);
        });
    }

    update(req, res, next) {
        const obj = {
            email: req.body.email,
            name: req.body.name,
            dob: date.convertDateAsString(req.body.dob),
            address: req.body.address,
            image: {
                data: fs.readFileSync(req.file.path),
                contentType: "image/png"
            }
        }
        Staff.updateOne({ _id: req.query.id }, obj, err => {
            if (!err) res.redirect("/staff/profile");
            else next(err);
        });
    }

    store(req, res, next) {
        const obj = {
            email: req.body.email,
            name: req.body.name,
            dob: date.convertDateAsString(req.body.dob),
            address: req.body.address,
            image: {
                data: fs.readFileSync(req.file.path),
                contentType: "image/png"
            }
        }
        console.log(obj)
        const staff = new Staff(obj);
        staff.save(err => {
            if (!err) {
                res.redirect("/staff/profile");
            } else next(err);
        });
    }

    delete(req, res, next) {
        Staff.deleteOne({ _id: req.query.id }, err => {
            if (!err) res.redirect("/staff/profile");
            else next(err);
        });
    }

    /** (Vuong)
     * ================================================================= *
     * ================================================================= *
     * ==================TRAINEE ACCOUNTS MANAGEMENT==================== *
     * ================================================================= *
     * ================================================================= *
     */

    showTraineeAccounts(req, res, next) {
        Trainee.find({}, (err, trainees) => {
            const user = req.session.user;
            if(!err) res.render("staff/trainee-accounts", {trainees, user, total: trainees.length});
            else next(err);
        });
    }

    async storeTraineeAccount(req, res, next) {
        try {
            const account = new Account({
                email: req.body.email,
                password: await encrypt(defaultPassword),
                role: "trainee"
            });
            const data = (req.file) ? fs.readFileSync(req.file.path) : fs.readFileSync(defaultAvatar);
            const filename = (req.file) ? req.file.filename : "";
            const trainee = new Trainee({
                email: req.body.email,
                image: {
                    data: data,
                    contentType: "image/png",
                    name: filename
                },
                name: req.body.name,
                dob: date.convertDateAsString(req.body.dob),
                address: req.body.address,
                education: req.body.education
            });
            account.save();
            trainee.save();
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/staff/trainee-accounts");
    }

    editTraineeAccount(req, res, next) {
        Trainee.findById(req.query.id, (err, trainee) => {
            if (!err) res.render("staff/editTrainee", {trainee, user: req.session.user});
            else next(err);
        });
    }

    async updateTraineeAccount(req, res, next) {
        const newAccount = {email: req.body.email};
        let newTrainee;
        if(req.file) {
            newTrainee = {
                email: req.body.email,
                image: {
                    data: fs.readFileSync(req.file.path),
                    contentType: "image/png",
                    name: req.file.filename
                },
                name: req.body.name,
                dob: date.convertDateAsString(req.body.dob),
                address: req.body.address,
                education: req.body.education
            }
        }else {
            newTrainee = {
                email: req.body.email,
                name: req.body.name,
                dob: date.convertDateAsString(req.body.dob),
                address: req.body.address,
                education: req.body.education
            }
        }
        try {
            await Account.updateOne({email: req.body.email}, newAccount);
            await Trainee.updateOne({_id: req.query.id}, newTrainee);
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/staff/trainee-accounts");
    }

    async deleteTraineeAccount(req, res, next) {
        try {
            const deletedTrainee = await Trainee.findByIdAndDelete(req.query.id);
            const filename = deletedTrainee.image.name;
            if(filename) fs.unlinkSync(path.join(traineeUploads, filename));
            await Account.deleteOne({email: deletedTrainee.email});
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/staff/trainee-accounts");
    }

    async setDefaultPassTee(req, res, next) {
        try {
            const aTrainee = await Trainee.findById({_id: req.query.id});
            const passwordHash = await encrypt(defaultPassword);
            const obj = {password: passwordHash};
            await Account.updateOne({email: aTrainee.email}, obj);
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/staff/trainee-accounts");
    }

    searchTraineeAccounts(req, res, next) {
        if(!req.query.q) return res.redirect("/staff/trainee-accounts");
        const keyword = {$regex: req.query.q, $options: 'i'};
        Trainee.find({$or: [{email: keyword}, {name: keyword}]}, (err, trainees) => {
            if (!err) {
                res.render("staff/trainee-accounts", {
                    trainees, 
                    user: req.session.user,
                    total: trainees.length, 
                    q: req.query.q
                });
            }
            else next(err);
        });
    }
}

module.exports = new StaffController();