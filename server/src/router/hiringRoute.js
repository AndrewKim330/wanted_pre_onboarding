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
    .put(updateSingleNotice)
    .delete(deleteSingleNotice);

hiringRoute.route('/allNotices').get(allNotices);

module.exports = { hiringRoute };
