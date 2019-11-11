const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Item model

const Item = require("../../models/Item");

//Routes

//@route        GET api/items
//@description  Get all Items
//@access       PUBLIC

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

//@route        POST api/items
//@description  Create an item
//@access       PRIVATE

router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  //@route        DELETE api/items/:id
  //@description  Delete an item
  //@access       PRIVATE

  router.delete("/:id", auth, (req, res) => {
    Item.findById(req.params.id)
      .then(item => item.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  });
  newItem.save().then(item => res.json(item));
});

module.exports = router;
