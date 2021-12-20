const Trainee = require("../models/Trainee");
const Account = require("../models/Account");
const Category = require("../models/Category")
const Course = require("../models/Course")
const fs = require("fs");
const path = require("path");
const { encrypt } = require("../utils/hashingHandler");
const defaultPassword = "123456789";
const date = require("../utils/dateHandler");
const defaultAvatar = path.join(__dirname, "../public/images/avatar/avatar.png");
const traineeUploads = path.join(__dirname, "../public/uploads/trainees");
const { getFlash, addFlash } = require("../utils/flashHandler");

class StaffController {
    index(req, res) {
        res.render("staff", { user: req.session.user });
    }

    /**
     * ================================================================= *
     * ================================================================= *
     * ======================Category Course============================ *
     * ================================================================= *
     * ================================================================= *
     */

    showCategories(req, res, next) {
        Category.find({}, (err, categories) => {
            const total = categories.length;
            if (!err) res.render("staff/categories", {
                categories,
                total,
                user: req.session.user,
                flashMsgs: getFlash(req),
            });
            else next(err);
        });
    }

    storeCategory(req, res, next) {
        const category = new Category(req.body);
        category.save(err => {
            addFlash(req, "success", "Update admin succeed!");
            console.log(category);
            if (!err) res.redirect("/staff/categories");
            else next(err);
        });
    }

    editCategory(req, res, next) {
        Category.findById(req.query.id, (err, category) => {
            if (!err) res.render("staff/editCategory", { category });
            else next(err);
        });
    }


    updateCategory(req, res, next) {
        Category.updateOne({ _id: req.query.id }, req.body, err => {
            addFlash(req, "success", "Update category succeed!");
            if (!err) res.redirect("/staff/categories");
            else next(err);
        });
    }

    deleteCategory(req, res, next) {
        Category.deleteOne({ _id: req.query.id }, err => {
            addFlash(req, "success", "Delete category succeed!");
            if (!err) res.redirect("/staff/categories");
            else next(err);
        });
    }

    searchCategory(req, res, next) {
        Category.find({ name: { $regex: req.query.q, $options: 'i' } }, (err, categories) => {
            const total = categories.length;
            if (!err) {
                res.render("staff/categories", { categories, user: req.session.user, total });
            } else next(err);
        });
    }

    /**
     * ================================================================= *
     * ================================================================= *
     * ============================Course=============================== *
     * ================================================================= *
     * ================================================================= *
     */
    showCourses(req, res, next) {
        Course.find({}, (err, courses) => {
            const total = courses.length;
            Category.find({}, (err, categories) => {
                if (!err) res.render("staff/courses", { categories, courses, total, user: req.session.user });
                else next(err);
            })
        });
    }

    storeCourse(req, res, next) {
        const obj = {
            code: req.body.code,
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            session: req.body.session,
            createAt: date.convertDateAsString(req.body.createAt),
            updateAt: date.convertDateAsString(req.body.updateAt),
        }
        console.log(obj)
        const course = new Course(obj);
        course.save(err => {
            if (!err) res.redirect("/staff/courses");
            else next(err);
        });
    }

    editCourse(req, res, next) {
        Course.findById(req.query.id, (err, course) => {
            Category.find({}, (err, categories) => {
                if (!err) res.render("staff/editCourse", { categories, course, user: req.session.user });
                else next(err);
            })
        });
    }

    updateCourse(req, res, next) {
        const obj = {
            code: req.body.code,
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            session: req.body.session,
            createAt: date.convertDateAsString(req.body.createAt),
            updateAt: date.convertDateAsString(req.body.updateAt),
        }
        Course.updateOne({ _id: req.query.id }, obj, err => {
            console.log(obj)
            if (!err) res.redirect("/staff/courses");
            else next(err);
        });
    }

    deleteCourse(req, res, next) {
        Course.deleteOne({ _id: req.query.id }, err => {
            if (!err) res.redirect("/staff/courses");
            else next(err);
        })
    }

    searchCourse(req, res, next) {
        Course.find({ $or: [{ code: { $regex: req.query.qq, $options: 'i' } }, { name: { $regex: req.query.qq, $options: 'i' } }] }, (err, courses) => {
            const total = courses.length;
            if (!err) {
                res.render("staff/courses", { courses, user: req.session.user, total });
            } else next(err);
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
            if (!err) res.render("staff/trainee-accounts", { trainees, user, total: trainees.length });
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
                code: req.body.code,
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
            if (!err) res.render("staff/editTrainee", { trainee, user: req.session.user });
            else next(err);
        });
    }

    async updateTraineeAccount(req, res, next) {
        const newAccount = { email: req.body.email };
        let newTrainee;
        if (req.file) {
            newTrainee = {
                email: req.body.email,
                image: {
                    data: fs.readFileSync(req.file.path),
                    contentType: "image/png",
                    name: req.file.filename
                },
                name: req.body.name,
                code: req.body.code,
                dob: date.convertDateAsString(req.body.dob),
                address: req.body.address,
                education: req.body.education
            }
        } else {
            newTrainee = {
                email: req.body.email,
                name: req.body.name,
                code: req.body.code,
                dob: date.convertDateAsString(req.body.dob),
                address: req.body.address,
                education: req.body.education
            }
        }
        try {
            await Account.updateOne({ email: req.body.email }, newAccount);
            await Trainee.updateOne({ _id: req.query.id }, newTrainee);
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
            if (filename) fs.unlinkSync(path.join(traineeUploads, filename));
            await Account.deleteOne({ email: deletedTrainee.email });
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/staff/trainee-accounts");
    }

    async setDefaultPassTee(req, res, next) {
        try {
            const aTrainee = await Trainee.findById({ _id: req.query.id });
            const passwordHash = await encrypt(defaultPassword);
            const obj = { password: passwordHash };
            await Account.updateOne({ email: aTrainee.email }, obj);
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/staff/trainee-accounts");
    }

    searchTraineeAccounts(req, res, next) {
        if (!req.query.q) return res.redirect("/staff/trainee-accounts");
        const keyword = { $regex: req.query.q, $options: 'i' };
        Trainee.find({ $or: [{ email: keyword }, { name: keyword }] }, (err, trainees) => {
            if (!err) {
                res.render("staff/trainee-accounts", {
                    trainees,
                    user: req.session.user,
                    total: trainees.length,
                    q: req.query.q
                });
            } else next(err);
        });
    }
}

module.exports = new StaffController();