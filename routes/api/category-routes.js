const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: Product,
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: Product,
    });
    !category
      ? res.status(404).json({
          message:
            "Oops! I did it again. I played with your heart, got lost in the route, because there is no category!",
        })
      : res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new category by id
router.get("/:id", (req, res) => {
  Category.findOne({ where: { id: req.params.id }, include: [Product] })
    .then((categoryData) => res.status(200).json(categoryData))
    .catch((err) => res.status(400).json(err));
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "No category found!" });
    }
    await category.update(req.body);
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "No category found!" });
    }
    await category.destroy(req.body);
    res.json({ message: "Category deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
