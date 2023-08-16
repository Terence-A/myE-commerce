const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: { model: Product, through: ProductTag },
    });
    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "No tags found.", error: err });
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include: { model: Product, through: ProductTag },
    });
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: "No tags found.", error: err });
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);
    res.json(tag);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err });
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  const tag_id = req.params.id;
  try {
    await Tag.update(req.body, {
      where: { id: tag_id },
    });
    if (!tag_id) {
      return res.status(404).json({ message: "No tags found.", error: err });
    }
    res.status(200).json({ message: "Updated tag." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(500).json({ message: "No tags found.", error: err });
    }
    await tag.destroy();
    res.json("Deleted tag.");
  } catch (err) {
    res.status(500).json({ message: "Error", error: err });
  }
});
module.exports = router;
