const {
    allNotices,
    addSingleNotice,
    updateSingleNotice,
    deleteSingleNotice,
} = require('../controller/hiringController.js');
const express = require('express');
const hiringRoute = express.Router();

hiringRoute
    .route('/singleNotice')
    .post(addSingleNotice)
    .get(allNotices)
    .put(updateSingleNotice)
    .delete(deleteSingleNotice);

hiringRoute.route('/allNotices');

module.exports = { hiringRoute };
