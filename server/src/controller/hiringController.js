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
    const resObj = {
        data: null,
        msg: 'Your notice is successfully added in the server',
        status: 200,
    };
    const { company_id, hiring_position } = req.body;
    const notExistCanAdd = await Notice.findOrCreate({
        where: { company_id: company_id, hiring_position: hiring_position },
        defaults: noticeData,
    });
    if (!notExistCanAdd[1]) {
        (resObj.msg = 'Same notice is already added'), (resObj.status = 400);
    }

    res.status(resObj.status).send({ data: resObj.data, msg: resObj.msg });
};

const updateSingleNotice = async (req, res) => {
    console.log('patch sequnece - update single notice');
    const findCond = await req.query;
    const modification = await req.body;
    const resObj = {
        data: null,
        msg: 'Your notice is successfully modified',
        status: 200,
    };
    let targetNotice = await Notice.findOne({ where: findCond });
    if (!targetNotice) {
        const msg = 'Cannot specify a notice with your condition';
        return res.status(400).send({ data: null, msg: msg });
    }
    await targetNotice.set(modification);
    await targetNotice.save();
    res.status(resObj.status).send({ data: resObj.data, msg: resObj.msg });
};

const deleteSingleNotice = async (req, res) => {
    console.log('delete sequnece - delete single notice');
    const findCond = await req.query;
    let resObj;
    let targetNotice = await Notice.findOne({ where: findCond });
    if (!targetNotice) {
        const msg = 'Cannot specify a notice with your condition';
        return res.status(400).send({ data: null, msg: msg });
    }
    await targetNotice.destroy();
    resObj = {
        data: null,
        msg: 'Your notice is successfully deleted',
        status: 200,
    };
    res.status(resObj.status).send({ data: resObj.data, msg: resObj.msg });
};

const showNoticeDetail = async (req, res) => {
    const { company_id, hiring_position } = req.query;
    const joinedTable = await sequelize.query(
        'SELECT * FROM "Companies" LEFT OUTER JOIN "Notices" ON "Notices".company_id = "Companies".id'
    );
    const resObj = {
        data: null,
        msg: 'Details of notice is successfully loaded',
        status: 200,
    };
    const otherNotices = [];
    joinedTable[0].forEach((elem, idx) => {
        if (elem.company_id === Number(company_id)) {
            if (elem.hiring_position === hiring_position) {
                resObj.data = elem;
            } else {
                otherNotices.push(elem.id);
            }
        }
    });
    resObj.data.otherNotices = otherNotices;

    res.status(resObj.status).send({ data: resObj.data, msg: resObj.msg });
};

const searchFromDB = async (req, res) => {
    const { search } = req.query;
    const joinedTable = await sequelize.query(
        'SELECT * FROM "Companies" LEFT OUTER JOIN "Notices" ON "Notices".company_id = "Companies".id'
    );
    console.log(joinedTable);
};

module.exports = {
    allNotices,
    addSingleNotice,
    updateSingleNotice,
    deleteSingleNotice,
    showNoticeDetail,
};
