const { createPool } = require("mysql");
const pool = createPool({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 10,
});
pool.query(`select * from students`, (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  return console.log(results);
});

pool.query(`select * from students`, (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  return console.log(results);
});
//ALTER USER 'yourusername'@'localhost' IDENTIFIED WITH mysql_native_password BY 'process.env.DB_PASSWORD';
