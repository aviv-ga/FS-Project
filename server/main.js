const express = require("express");
const cors = require("cors");

const productsController = require("./productsController");
const customersController = require("./customersController");
const purchasesController = require("./purchasesController");
//const authController = require("./authController");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use("/products", productsController);
app.use("/customers", customersController);
app.use("/purchases", purchasesController);
//app.use("/auth", authController);

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);
