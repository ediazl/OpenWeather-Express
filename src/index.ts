import express from "express";
const { MongoClient } = require("mongodb");
require("dotenv").config();
require("./DB/config");
const app = express();
const port = 3000;

const OpenWeatherRouter = require("./openweather/Openweather.router");

app.use(express.json());
app.use(OpenWeatherRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
