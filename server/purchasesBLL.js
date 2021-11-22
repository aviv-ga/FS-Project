const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "storeDB",
  password: "1234",
  port: 5432,
});

const getAllPurchases = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM purchases");
    return rows;
  } catch (error) {
    return error;
  }
};

const getPurchasesDatesById = async (id) => {
  try {
    const { rows } = await pool.query(`SELECT date
    FROM purchases
    JOIN products On purchases.productid = products.id AND purchases.customerid = ${id}
`);
    return rows;
  } catch (error) {
    return error;
  }
};

const getFilterredPurcases = async (cid, pid, date) => {
  console.log(cid, pid, date);
  if (cid === "0") {
    cid = "customerid";
  }
  if (pid === "0") {
    pid = "productid";
  }
  if (date === "none") {
    date = "date";
  }

  let q = `SELECT p1.date, p3.firstname || ' ' || p3.lastname as firstname, p2.name
    FROM purchases as p1 inner join products as p2 on p1.productid = p2.id inner join customers as p3 on p1.customerid=p3.id
    WHERE p1.customerid = ${cid}
    AND p1.productid = ${pid}
    AND date = ${date}`;

  try {
    const { rows } = await pool.query(q);
    return rows;
  } catch (error) {
    return error;
  }
};

const insertPurchase = async (purchase) => {
  try {
    console.log(purchase);
    await pool.query(
      `INSERT INTO purchases (customerid, productid, date) VALUES ('${purchase.customerid}', ${purchase.productid}, ${purchase.date})`
    );
    return `Purchase at ${purchase.date} was added succesfully`;
  } catch (error) {
    return error;
  }
};

const deletePurchasesByCustomerId = async (id) => {
  try {
    await pool.query("DELETE from purchases where customerid=$1", [+id]);
    return `Purchases with customer ID: ${id} were deleted successfully`;
  } catch (error) {
    return error;
  }
};

const deletePurchasesByProductId = async (id) => {
  try {
    await pool.query("DELETE from purchases where productid=$1", [+id]);
    return `Purchases with product ID: ${id} were deleted successfully`;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllPurchases,
  insertPurchase,
  getPurchasesDatesById,
  deletePurchasesByCustomerId,
  deletePurchasesByProductId,
  getFilterredPurcases,
};
