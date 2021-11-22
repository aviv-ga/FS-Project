const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "storeDB",
  password: "1234",
  port: 5432,
});

const getAllProducts = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM products");
    return rows;
  } catch (error) {
    return error;
  }
};

const getProductsByCustomerId = async (id) => {
  try {
    const { rows } = await pool.query(
      `SELECT productid, name, price, quantity, date
    FROM purchases
    JOIN products On purchases.productid = products.id AND purchases.customerid = ${id}`
    );
    return rows;
  } catch (error) {
    return error;
  }
};

const getPrices = async () => {
  try {
    const { rows } = await pool.query(
      "SELECT price FROM products JOIN purchases ON products.id = purchases.productid"
    );
    return rows;
  } catch (error) {
    return error;
  }
};
const insertProduct = async (product) => {
  try {
    await pool.query(
      `INSERT INTO products (name, price, quantity) VALUES ('${product.name}', ${product.price}, ${product.quantity})`
    );
    return `${product.name} was added succesfully`;
  } catch (error) {
    return error;
  }
};

const updateProduct = async (id, product) => {
  console.log(product);
  try {
    await pool.query(
      "UPDATE products SET name=$1, price=$2, quantity=$3 WHERE id=$4",
      [product.name, product.price, product.quantity, +id]
    );
    return `product with ID: ${id} was updated successfully`;
  } catch (error) {
    return error;
  }
};

const decreaseQuantity = async (id) => {
  try {
    await pool.query(`UPDATE products SET quantity=quantity-1 WHERE id=${id}`);
    return `Quantity of product with ID: ${id} was updated successfully`;
  } catch (error) {
    return error;
  }
};
const deleteProduct = async (id) => {
  try {
    await pool.query("DELETE from products where id=$1", [+id]);
    return `product with ID: ${id} was deleted successfully`;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllProducts,
  getProductsByCustomerId,
  getPrices,
  insertProduct,
  updateProduct,
  decreaseQuantity,
  deleteProduct,
};
