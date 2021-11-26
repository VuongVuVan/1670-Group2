const Category = require("../models/Category");

class CategoryController {
    show(req, res, next) {
        Category.find({}, (err, categories) => {
            if (!err) res.render("categories", { data: categories });
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
}

module.exports = new CategoryController();