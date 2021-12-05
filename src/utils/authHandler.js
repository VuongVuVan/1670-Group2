exports.isLogged = (req, res, next) => {
    return (req.session.user) ? res.redirect(`/${req.session.user.role}`) : next();
}

exports.isAdmin = (req, res, next) => {
    if(!req.session.user) return res.redirect("/");
    const role = req.session.user.role;
    return role != "admin" ? res.redirect(`/${role}`) : next();
}

exports.isStaff = (req, res, next) => {
    if(!req.session.user) return res.redirect("/");
    const role = req.session.user.role;
    return role != "staff" ? res.redirect(`/${role}`) : next();
}

exports.isTrainer = (req, res, next) => {
    if(!req.session.user) return res.redirect("/");
    const role = req.session.user.role;
    return role != "trainer" ? res.redirect(`/${role}`) : next();
}

exports.isTrainee = (req, res, next) => {
    if(!req.session.user) return res.redirect("/");
    const role = req.session.user.role;
    return role != "trainee" ? res.redirect(`/${role}`) : next();
}

