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
            res.redirect(`/${anAccount.role}`);
        } catch (err) {
            console.log(err);
            return next(err);
        }
    }

    logout(req, res, next) {
        req.session.destroy();
        res.redirect("/");
    }

    showProfile(req, res, next) {
        const slug = req.params.slug;
        const name = req.session.user.name.split(" ").join("");
        const role = req.session.user.role;
        if(role == "admin") {
            res.render("admin/profile", {user: req.session.user});
        }else if(role == "staff") {
            // res.render("");
        }else if(role == "trainer") {
            // res.render("");
        }else if(role == "trainee") {
            // res.render("");
        }
    }

    changePassword(req, res, next) {
        res.render("site/changePassword", {user: req.session.user});
    }

    async storePassword(req, res, next) {
        const user = req.session.user;
        try {
            if(!(req.body.newP == req.body.confirmNP)) {
                return res.render("site/changePassword", {
                    user,
                    msg: "Your confirm password is invalid"
                });
            }
            const anAccount = await Account.findOne({email: user.email});
            console.log(anAccount)
            const match = await checkPassword(req.body.currentP, anAccount.password);
            console.log(req.body.currentP)
            console.log(match)
            if(!match) {
                return res.render("site/changePassword", {
                    user,
                    msg2: "Your current password is invalid"
                });
            }
            const passwordHash = await encrypt(req.body.newP);
            await Account.updateOne({email: user.email}, {password: passwordHash});
        } catch (err) {
            console.log(err);
            return next(err);
        }
        res.redirect(`/${user.name.split(" ").join("")}`);
    }
}

module.exports = new SiteController();