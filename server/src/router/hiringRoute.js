const {
    allNotices,
    addSingleNotice,
    updateSingleNotice,
    deleteSingleNotice,
    showNoticeDetail,
} = require('../controller/hiringController.js');
const express = require('express');
const hiringRoute = express.Router();

hiringRoute
    .route('/singleNotice')
    .post(addSingleNotice)
    .patch(updateSingleNotice)
    .delete(deleteSingleNotice);

hiringRoute.route('/allNotices').get(allNotices);

hiringRoute.route('/singleNoticeDetail').get(showNoticeDetail);

module.exports = { hiringRoute };
