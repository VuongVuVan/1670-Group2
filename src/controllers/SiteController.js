const Account = require("../models/Account");
const Admin = require("../models/Admin");
const Staff = require("../models/Staff");
const Trainer = require("../models/Trainer");
const Trainee = require("../models/Trainee");
const { checkPassword } = require("../utils/hashingHandler");

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
}

module.exports = new SiteController();