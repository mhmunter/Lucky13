const router = require("express").Router();
const { response } = require("express");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
  })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
  // find all categories
  // be sure to include its associated Products
});

router.get("/:id", (req, res) => {
  Category.findByPk(req.params.id)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    id: req.body.id,
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});





router.put("/:id", (req, res) => {
// update a category by its `id` value
Category.update({
           id: req.body.id,
category_name: req.body.category_name,
},
{
// Gets a book based on the book_id given in the request parameters
where: {
  category_id: req.params.category_id,
},
}
)
.then((updatedCategory) => {
res.json(updatedCategory);
})
.catch((err) => {
console.log(err);
res.json(err);
});

});




router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
