const Category = require("../models/Category");

class CategoryController {
    show(req, res, next) {
        Category.find({}, (err, categories) => {
            const total = categories.length;
            if (!err) res.render("categories", { data: categories, total, user: req.session.user });
            else next(err);
        });
    }

    create(req, res, next) {
        res.render("categories/create")
    }

    store(req, res, next) {
        const category = new Category(req.body);
        category.save(err => {
            console.log(category);
            if (!err) res.redirect("/categories");
            else next(err);
        });
    }

    edit(req, res, next) {
        Category.findById(req.query.id, (err, category) => {
            if (!err) res.render("categories/edit", { data: category });
            else next(err);
        });
    }


    update(req, res, next) {
        Category.updateOne({ _id: req.query.id }, req.body, err => {
            if (!err) res.redirect("/categories");
            else next(err);
        });
    }

    delete(req, res, next) {
        Category.deleteOne({ _id: req.query.id }, err => {
            if (!err) res.redirect("/categories");
            else next(err);
        });
    }

    search(req, res, next) {
        Category.find({ name: { $regex: req.query.q, $options: 'i' } }, (err, categories) => {
            const total = categories.length;
            if (!err) {
                res.render("categories", { data: categories, user: req.session.user, total });
            } else next(err);
        });
    }
}

module.exports = new CategoryController();