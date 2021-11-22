const express = require("express");
const purchasesBLL = require("./purchasesBLL");
const jwt = require("jsonwebtoken");
const router = express.Router();
const ACCESS_TOKEN_SECRET = "tokenKey";

// Entry Point: 'http://localhost:8000/purchases'

router.get("/", async (req, res) => {
  const purchases = await purchasesBLL.getAllPurchases();
  return res.status(200).send(purchases);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const dates = await purchasesBLL.getPurchasesDatesById(id);
  return res.json(dates);
});

router.get("/:cid/:pid/:date", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const date = req.params.date;
  const result = await purchasesBLL.getFilterredPurcases(cid, pid, date);
  return res.json(result);
});

// Add (POST)
router.route("/").post(async (req, res) => {
  const newPurchase = req.body;
  const result = await purchasesBLL.insertPurchase(newPurchase);
  return res.json(result);
});

router.route("/:id/product").delete(async (req, res) => {
  const id = req.params.id;
  const result = await purchasesBLL.deletePurchasesByProductId(id);
  return res.json(result);
});

router.route("/:id/customer").delete(async (req, res) => {
  const id = req.params.id;
  const result = await purchasesBLL.deletePurchasesByCustomerId(id);
  return res.json(result);
});

module.exports = router;
