const Account = require("../models/Account");

class AccountController {
    showAction(req, res, next) {
        Account.find({}, (err, accounts) => {
            if(!err) res.render("admin/create", {accounts});
            else next(err);
        });
    }
}

modules.export = new AccountController();