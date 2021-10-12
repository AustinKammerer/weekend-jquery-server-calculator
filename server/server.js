// modules
const express = require("express");
const bodyParser = require("body-parser");
const calcsList = require("./Modules/calcsList.js");
const functions = require("./Modules/functions.js");

const app = express(); // express server
// environment variable for deployment - Heroku
const PORT = process.env.PORT || 5000; // Port number

app.listen(PORT, () => {
  console.log("App running on port", PORT);
}); // start the server

app.use(express.static("server/Public")); // static files route

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/calculate", (req, res) => {
  console.log("GET Request:", calcsList);
  res.send(calcsList);
}); // GET route

app.post("/calculate", (req, res) => {
  let calcToMake = req.body;
  console.log("POST Request:", calcToMake);
  let validOperator = functions.validatedTerms(calcToMake).operator;
  let validValues = functions.validatedTerms(calcToMake).values;
  // calculation will only run if the values and operator are valid
  if (validOperator === false || validValues === false) {
    console.log(validOperator, validValues);
    res.status(400).send({ msg: "INVALID OPERATOR AND/OR VALUES" });
  } else {
    calcsList.unshift(functions.validatedCalculate(calcToMake));
    console.log("calcList:", calcsList);
    // calculate adds an answer property to the request
    // the request is added to the front of the calcsList array
    res.sendStatus(201);
  }
}); // POST route

app.get("/entry/:index", (req, res) => {
  let index = req.params.index;
  res.send(calcsList[index]);
}); // GET route

app.delete("/entry/:index", (req, res) => {
  let index = req.params.index;
  console.log("DELETE Request: ", index);
  if (index === "all") {
    // if EC button is clicked
    calcsList.splice(0, calcsList.length);
    console.log(calcsList);
    res.sendStatus(200);
  }
  // if delete button in an entry is clicked
  else if (Number(index) >= 0 && Number(index) < calcsList.length) {
    // removes the entry from the list
    calcsList.splice(Number(index), 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});
