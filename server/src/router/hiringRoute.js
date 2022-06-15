const {
    addSingleNotice,
    viewAllNotices,
    updateSingleNotice,
    deleteSingleNotice,
} = require('../controller/hiringController.js');
const express = require('express');
const hiringRoute = express.Router();

hiringRoute
    .route('/singleNotice')
    .post(addSingleNotice)
    .get(viewAllNotices)
    .put(updateSingleNotice)
    .delete(deleteSingleNotice);

hiringRoute.route('/allNotices');

module.exports = { hiringRoute };
