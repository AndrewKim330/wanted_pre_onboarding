const { sequelize, User, Notice, Company } = require('../../db/models');

(async () => {
    await sequelize.sync();
})();

const allNotices = async (req, res) => {
    console.log('get sequnece - view all notices');
    const allNotices = await Notice.findAll();
    res.status(200).send(allNotices);
};

const addSingleNotice = async (req, res) => {
    console.log('post sequnece - add single notice');
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
