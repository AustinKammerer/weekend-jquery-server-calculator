// modules
const express = require("express");
const bodyParser = require("body-parser");
const calcsList = require("./Modules/calcsList.js");
const functions = require("./Modules/functions.js");

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

app.post("/calc", (req, res) => {
  let calcToMake = req.body;
  console.log("Request:", calcToMake);
  if (
    !functions.validateOperation(calcToMake) ||
    !functions.validateValue1(calcToMake) ||
    !functions.validateValue2(calcToMake)
  ) {
    res.status(400).send({ msg: functions.errorMsg(calcToMake) });
  } else if (
    functions.validateOperation(calcToMake) &&
    functions.validateValue1(calcToMake) &&
    functions.validateValue2(calcToMake)
  ) {
    calcsList.unshift(functions.validatedCalculate(calcToMake));
    console.log("calcList:", calcsList);
    // calculate adds an answer property to the request
    // the request is added to the front of the calcsList array
    res.sendStatus(201);
  }
}); // POST route

app.get("/entry", (req, res) => {
  let index = req.query.i;
  res.send(calcsList[index]);
}); // GET route
