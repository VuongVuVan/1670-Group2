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
            if(anAccount) match = checkPassword(req.body.password, anAccount.password);
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
        var flag = false;
        if(req.session.user) {
            const slug = req.params.slug;
            const name = req.session.user.name.split(" ").join("");
            flag = (slug==name);
        }
        if(!flag) return res.status(404).send("Page not found");
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
        try {
            if(req.body.newPassword == req.body.oldPassword) {
                const anAccount = await Account.findOne({email: req.session.user.email});
                const match = checkPassword(req.body.oldPassword, req.body.newPassword);
            }
            if(match) {
                const passwordHash = await encrypt(req.body.newPassword);
                await Account.updateOne({email: req.body.email}, {password: passwordHash});
            }
        } catch (err) {
            console.log(err);
            return next(err);
        }
        console.log(req.body.oldPassword);
        console.log(req.body.newPassword);
        console.log(req.body.confirmPassword);
        const name = req.session.user.split(" ").join("");
        res.redirect(`/${name}`);
    }
}

module.exports = new SiteController();