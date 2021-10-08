const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const PORT = 5000;

app.listen(PORT, () => {
  console.log("App running on port", PORT);
});

app.use(express.static("server/public"));

app.use(bodyParser.urlencoded({ extended: true }));
