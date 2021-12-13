const Account = require("../models/Account");
const Admin = require("../models/Admin");
const Staff = require("../models/Staff");
const Trainer = require("../models/Trainer");
const Trainee = require("../models/Trainee");
const {checkPassword, encrypt} = require("../utils/hashingHandler");

class SiteController {
    indexAction(req, res, next) {
        res.render("index");
    }

    async login(req, res, next) {
        let anAccount;
        let anUser;
        var match = false;
        try {
            const email = req.body.email;
            anAccount = await Account.findOne({email});
            if(anAccount) match = await checkPassword(req.body.password, anAccount.password);
            if(!match) return res.render("index", {msg: "Your email or password is incorrect!"});
            if(anAccount.role == "admin") {
                anUser = await Admin.findOne({email});
            }else if(anAccount.role == "staff") {
                anUser = await Staff.findOne({email});
            }else if(anAccount.role == "trainer") {
                anUser = await Trainer.findOne({email});
            }else if(anAccount.role == "trainee") {
                anUser = await Trainee.findOne({email});
            }
            req.session["user"] = {
                email: anUser.email,
                name: anUser.name,
                image: anUser.image,
                role: anAccount.role
            }
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect(`/${anAccount.role}`);
    }

    logout(req, res, next) {
        req.session.destroy();
        res.redirect("/");
    }

    showProfile(req, res, next) {
        const role = req.session.user.role;
        if(role == "admin") {
            res.render("admin/profile", {user: req.session.user});
        }else if(role == "staff") {
            res.render("staff/profile", {user: req.session.user});
        }else if(role == "trainer") {
            res.render("trainer/profile", {user: req.session.user});
        }else if(role == "trainee") {
            res.render("trainee/profile", {user: req.session.user});
        }
    }

    changePassword(req, res, next) {
        res.render("site/changePassword", {user: req.session.user});
    }

    async storePassword(req, res, next) {
        try {
            const user = req.session.user;
            const anAccount = await Account.findOne({email: user.email});
            const match = await checkPassword(req.body.oldP, anAccount.password);
            if(!match) {
                return res.render("site/changePassword", {
                    user,
                    msg: "Make sure your entry is correct."
                });
            }
            const passwordHash = await encrypt(req.body.newP);
            await Account.updateOne({email: user.email}, {password: passwordHash});
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/logout");
    }
}

module.exports = new SiteController();