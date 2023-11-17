const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const server = express();

server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());
let con = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(
    "CREATE DATABASE `YTTERBIUM HIGH-SQL DATABASE`",
    function (err, result) {
      if (err) throw err;
      console.log("Database created");
    }
  );
});
server.get("/", (req, res) => {
  res.render("Ytterbium High");
});
server.get("/feespayment", (req, res) => {
  res.render("feespayment");
});
server.post("/feespayment", (req, res) => {
  /*let sql = "INSERT INTO feespayment (name, amount) VALUES ?";
  let values = [
    [req.body.name, req.body.amount],
    [req.body.name, req.body.amount],
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });*/
  res.render;
});
server.get("/parents", (req, res) => {
  res.render("parents");
});
server.get("/registration", (req, res) => {
  res.render("registration");
});
server.get("/student", (req, res) => {
  res.render("student");
});
server.get("/supportstaff", (req, res) => {
  res.render("supportstaff");
});
server.get("/teachers", (req, res) => {
  res.render("teachers");
});

server.listen(8000, (req, res) => {
  console.log("Server is ready");
});
