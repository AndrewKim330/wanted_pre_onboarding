const { searchFromNotices } = require('../controller/searchingController.js');
const express = require('express');
const searchingRoute = express.Router();

searchingRoute.route('/').get(searchFromNotices);

module.exports = { searchingRoute };
