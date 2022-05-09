const router = require("express").Router();
const { response } = require("express");
const { Category, Product } = require("../../models");

// // The `/api/categories` endpoint
//find all category function
router.get("/", (req, res) => {
  Category.findAll({
    include: [{
      model: Product,
    }]
}).then(function (data) {
  res.json(data);
})
.catch(function (err) {
  res.json(err);
})
});

//alternative find by just id once user has been established

// router.get("/:id", (req, res) => {
//   Category.findByPk(req.params.id)
//     .then(function (data) {
//       res.json(data);
//     })
//     .catch(function (err) {
//       res.json(err);
//     });
//   // find one category by its `id` value
//   // be sure to include its associated Products
// });


//creates new category 
router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//changes an already exsisting category
router.put("/:id", (req, res) => {
// update a category by its `id` value
Category.update(req.body,{
where: {
  id: req.params.id,
},
})
.then((updatedCategory) => {
  if (!updatedCategory) {
    res.status(404).json({ message: "No category found with is id" });
    return;
  }
  res.json(updatedCategory);
})
.catch((err) => {
console.log(err);
res.json(err);
});

});


//deletes a cartegory
router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      if (!deletedCategory) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});



// finds one category by its `id` value
router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: Product,
  })
    .then((category) => {
      res.json(category);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});








module.exports = router;
