const { sequelize, User, Notice, Company } = require('../../db/models');

(async () => {
    await sequelize.sync();
})();

const allNotices = async (req, res) => {
    console.log('get sequnece - view all notices');
    const allNotices = await Notice.findAll();
    const resMsg = {
        data: allNotices,
        msg: 'All notices in the server are successfully loaded',
    };
    res.status(200).send(resMsg);
};

const addSingleNotice = async (req, res) => {
    console.log('post sequnece - add single notice');
    const noticeData = await req.body;
    await Notice.create(noticeData);
    const resMsg = {
        data: null,
        msg: 'Your notice is successfully added in the server',
    };
    res.status(200).send(resMsg);
};

const updateSingleNotice = async (req, res) => {
    console.log('put sequnece - update single notice');
};

const deleteSingleNotice = async (req, res) => {
    console.log('del sequnece - delete single notice');
};

module.exports = {
    allNotices,
    addSingleNotice,
    updateSingleNotice,
    deleteSingleNotice,
};
