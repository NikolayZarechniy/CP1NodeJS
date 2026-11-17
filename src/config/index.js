const path = require("path");
require("dotenv").config();

const config = {
  inputFile: process.env.INPUT_FILE
    ? path.resolve(process.env.INPUT_FILE)
    : null,
  outputFile: process.env.OUTPUT_FILE
    ? path.resolve(process.env.OUTPUT_FILE)
    : null,
  minAge: Number(process.env.MIN_AGE) || 0,
  cityFilter: process.env.CITY_FILTER ? process.env.CITY_FILTER.trim() : "",
};

module.exports = config;