const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "storeDB",
  password: "1234",
  port: 5432,
});

const getAllCustomers = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM customers");
    return rows;
  } catch (error) {
    return error;
  }
};

const getCustomersByProdId = async (id) => {
  try {
    const q = `SELECT  customerid, date, firstname, lastname, city
      FROM(
      SELECT customerid,productid,name, date FROM
      purchases JOIN products ON purchases.productid = products.id) AS res JOIN customers ON res.customerid = customers.id WHERE productid=${id}
	  `;
    const { rows } = await pool.query(q);
    return rows;
  } catch (error) {
    return error;
  }
};

const updateCustomer = async (id, customer) => {
  console.log(customer);
  try {
    await pool.query(
      "UPDATE customers SET firstname=$1, lastname=$2, city=$3 WHERE id=$4",
      [customer.firstname, customer.lastname, customer.city, +id]
    );
    return `customer with ID: ${id} was updated successfully`;
  } catch (error) {
    return error;
  }
};

const deleteCustomer = async (id) => {
  try {
    await pool.query("DELETE from customers where id=$1", [+id]);
    return `customer with ID: ${id} was deleted successfully`;
  } catch (error) {
    return error;
  }
};
module.exports = {
  getAllCustomers,
  getCustomersByProdId,
  updateCustomer,
  deleteCustomer,
};
