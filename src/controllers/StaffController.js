const Staff = require("../models/Staff");
const date = require("../utils/dateHandler");
const fs = require("fs");
const path = require("path");



class StaffController {
    index(req, res) {
        res.render("staff");
    }

    show(req, res, next) {
        Staff.find({}, (err, staffs) => {
            if (!err) res.render("staff/profile", { data: staffs });
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
}

module.exports = new StaffController();