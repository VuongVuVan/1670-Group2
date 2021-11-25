class SiteController {
    index(req, res) {
        res.render("index");
    }

    slider(req, res) {
        res.render("slider");
    }
}

module.exports = new SiteController();