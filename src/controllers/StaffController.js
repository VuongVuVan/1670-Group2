const Staff = require("../models/Staff");
const fs = require("fs");
const path = require("path");
const avatarPath = path.join(__dirname, "../public/uploads/demo");


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
        Staff.updateOne({ _id: req.query.id }, req.body, err => {
            if (!err) res.redirect("/profile");
            else next(err);
        });
    }

    store(req, res, next) {
        const obj = {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
            dob: req.body.dob,
            address: req.body.address,
            image: {
                data: fs.readFileSync(path.join(avatarPath, req.file.filename)),
                contentType: "image/png"
            }
        }
        console.log(obj)
        const staff = new Staff(obj);
        staff.save(err => {
            if (!err) {
                console.log("dasdsadsd")
                res.redirect("/staff/profile");
            } else next(err);
        });
    }
}

module.exports = new StaffController();