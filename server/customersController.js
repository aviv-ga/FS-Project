const express = require("express");
const customersBLL = require("./customersBLL");

const router = express.Router();

// Entry Point: 'http://localhost:8000/customers'

router.get("/", async (req, res) => {
  const customers = await customersBLL.getAllCustomers();
  return res.status(200).send(customers);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const customers = await customersBLL.getCustomersByProdId(id);
  return res.status(200).send(customers);
});

// PUT
router.route("/:id").put(async (req, res) => {
  const id = req.params.id;
  const customer = req.body;
  const result = await customersBLL.updateCustomer(id, customer);
  return res.json(result);
});

// DELETE
router.route("/:id").delete(async (req, res) => {
  const id = req.params.id;
  const result = await customersBLL.deleteCustomer(id);
  return res.json(result);
});

module.exports = router;
