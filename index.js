const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Set up express app
const app = express();

// Connect to mongoDb
mongoose.connect("mongodb://localhost/reciperevenue");
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use("/api", require("./routes/api"));

// Listen for requests
app.listen(process.env.port || 5000, function() {
  console.log("App is listen for requests...");
});