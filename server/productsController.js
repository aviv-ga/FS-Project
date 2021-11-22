const express = require("express");
const productsBLL = require("./productsBLL");
const router = express.Router();

// Entry Point: 'http://localhost:8000/products'

// Get All
router.get("/", async (req, res) => {
  const products = await productsBLL.getAllProducts();
  return res.json(products);
});

router.route("/prices").get(async (req, res) => {
  const prices = await productsBLL.getPrices();
  return res.json(prices);
});

// Get 'product' By Id
// the 'id' property is available as 'req.params.id'
router.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  const products = await productsBLL.getProductsByCustomerId(id);
  return res.json(products);
});

// Add 'product' (POST)
router.route("/").post(async (req, res) => {
  const newProduct = req.body;
  const result = await productsBLL.insertProduct(newProduct);
  console.log(result);
  return res.json(result);
});

// PUT
router.route("/:id").put(async (req, res) => {
  const id = req.params.id;
  const product = req.body;
  console.log(product);
  const result = await productsBLL.updateProduct(id, product);
  return res.json(result);
});

router.route("/quantity/:id").put(async (req, res) => {
  const id = req.params.id;
  console.log("Decresing quantity");
  const result = await productsBLL.decreaseQuantity(id);
  return res.json(result);
});

// DELETE
router.route("/:id").delete(async (req, res) => {
  const id = req.params.id;
  const result = await productsBLL.deleteProduct(id);
  return res.json(result);
});

module.exports = router;
