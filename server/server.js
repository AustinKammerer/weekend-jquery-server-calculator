// modules
const express = require("express");
const bodyParser = require("body-parser");
const calcsList = require("./Modules/calcsList.js");
const calculate = require("./Modules/calculate.js");

const app = express(); // express server

const PORT = 5000; // Port number

app.listen(PORT, () => {
  console.log("App running on port", PORT);
}); // start the server

app.use(express.static("server/public")); // static files route

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/calc", (req, res) => {
  res.send(calcsList);
}); // GET route

app.post("/calc", (res, req) => {
  let calcToMake = req.body;
  console.log("Request:", calcToMake);
  calcsList.unshift(calculate(calcToMake));
  // calculate adds an answer property to the request
  // the request is added to the front of the calcsList array
}); // POST route
