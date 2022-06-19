const {
    allNotices,
    addSingleNotice,
    updateSingleNotice,
    deleteSingleNotice,
    showNoticeDetail,
} = require('../controller/hiringController.js');
const express = require('express');
const hiringRoute = express.Router();

/*
- POST method to add single notice 
- PATCH method to modify some selected elements
- DELETE method to remove selected notice
*/
hiringRoute
    .route('/singleNotice')
    .post(addSingleNotice)
    .patch(updateSingleNotice)
    .delete(deleteSingleNotice);

// GET method to get all notices
hiringRoute.route('/allNotices').get(allNotices);

// GET method to get details of single notice
hiringRoute.route('/singleNoticeDetail').get(showNoticeDetail);

module.exports = { hiringRoute };
