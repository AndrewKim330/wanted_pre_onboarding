const { searchFromDB } = require('../controller/searchingController.js');
const express = require('express');
const searchingRoute = express.Router();

searchingRoute.route('/').get(searchFromDB);

module.exports = { searchingRoute };
