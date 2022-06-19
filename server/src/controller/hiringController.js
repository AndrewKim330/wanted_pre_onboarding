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
    let resObj;
    const { company_id, hiring_position } = req.body;
    const notExistCanAdd = await Notice.findOrCreate({
        where: { company_id: company_id, hiring_position: hiring_position },
        defaults: noticeData,
    });
    if (notExistCanAdd[1]) {
        resObj = {
            data: null,
            msg: 'Your notice is successfully added in the server',
            status: 200,
        };
    } else {
        resObj = {
            data: null,
            msg: 'Same notice is already added',
            status: 400,
        };
    }

    res.status(resObj.status).send({ data: resObj.data, msg: resObj.msg });
};

const updateSingleNotice = async (req, res) => {
    console.log('patch sequnece - update single notice');
    const findCond = await req.query;
    const modification = await req.body;
    let resObj;
    let targetNotice = await Notice.findOne({ where: findCond });
    if (!targetNotice) {
        resObj = {
            data: null,
            msg: 'Cannot specify a notice with your condition',
            status: 400,
        };
        return res
            .status(resObj.status)
            .send({ data: resObj.data, msg: resObj.msg });
    }
    await targetNotice.set(modification);
    await targetNotice.save();
    resObj = {
        data: null,
        msg: 'Your notice is successfully modified',
        status: 200,
    };
    res.status(resObj.status).send({ data: resObj.data, msg: resObj.msg });
};

const deleteSingleNotice = async (req, res) => {
    console.log('delete sequnece - delete single notice');
    const findCond = await req.query;
    let resObj;
    let targetNotice = await Notice.findOne({ where: findCond });
    if (!targetNotice) {
        resObj = {
            data: null,
            msg: 'Cannot specify a notice with your condition',
            status: 400,
        };
        return res
            .status(resObj.status)
            .send({ data: resObj.data, msg: resObj.msg });
    }
    await targetNotice.destroy();
    resObj = {
        data: null,
        msg: 'Your notice is successfully deleted',
        status: 200,
    };
    res.status(resObj.status).send({ data: resObj.data, msg: resObj.msg });
};

module.exports = {
    allNotices,
    addSingleNotice,
    updateSingleNotice,
    deleteSingleNotice,
};
