const router = require('express').Router();
//const { Model } = require('sequelize/types');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint.
//This findAll function uses join mathod to show all of the tables

router.get('/', (req, res) => {
  Tag.findAll({
    include: [{
      model: Product,
      through: ProductTag
  }]
    })
 

  .then(data => {res.json(data)})
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
//this findOne only pulls one item by id
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
      }
    ]
  })
    .then(data => {
      if(!data){
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});



//this will create a new Tag column
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then(PostData => res.json(PostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//this update will change one table by id
router.put('/:id', (req, res) => {
  Tag.update(req.body,{
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
    res.json(err);
    });
    
    });



    //this destroy function deletes one item by id
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      if (!deletedTag) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
