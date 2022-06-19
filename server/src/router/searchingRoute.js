const { searchFromNotices } = require('../controller/searchingController.js');
const express = require('express');
const searchingRoute = express.Router();

// GET method for searching from keyword
searchingRoute.route('/').get(searchFromNotices);

module.exports = { searchingRoute };
