const express = require("express");
const ejs = require("ejs");
const bodyparser = require("body-parser");

const server = express();

server.set("view engine", "ejs");

server.get("/", (req, res) => {
  res.send("server is up");
});

const port = 8000;
app.listen(port, (req, res) => {
  console.log("Server is ready");
});
