const { sequelize, Notice } = require('../../db/models');

// synchronize to DB
(async () => {
    await sequelize.sync();
})();

const allNotices = async (req, res) => {
    // get entire notices
    const allNotices = await Notice.findAll();
    const resMsg = {
        data: allNotices,
        msg: 'All notices in the server are successfully loaded',
    };
    res.status(200).send(resMsg);
};

const addSingleNotice = async (req, res) => {
    const noticeData = await req.body;
    const resObj = {
        data: null,
        msg: 'Your notice is successfully added in the server',
        status: 200,
    };
    const { company_id, hiring_position } = await req.body;

    // use findOrCreate method to avoid duplication of notice
    const notExistCanAdd = await Notice.findOrCreate({
        where: { company_id: company_id, hiring_position: hiring_position },
        defaults: noticeData,
    });

    // case when notice has same company_id and hiring_position (duplication)
    if (!notExistCanAdd[1]) {
        (resObj.msg = 'Same notice is already added'), (resObj.status = 400);
    }

    res.status(resObj.status).send({ data: resObj.data, msg: resObj.msg });
};

const updateSingleNotice = async (req, res) => {
    // specify single notice using request query
    const findCond = await req.query;
    const modification = await req.body;
    const resObj = {
        data: null,
        msg: 'Your notice is successfully modified',
        status: 200,
    };

    // specify single notice using find condition
    let targetNotice = await Notice.findOne({ where: findCond });

    // case when notice cannot be specificed by given condition
    if (!targetNotice) {
        const msg = 'Cannot specify a notice with your condition';
        return res.status(400).send({ data: null, msg: msg });
    }

    // apply modification
    await targetNotice.set(modification);
    await targetNotice.save();

    res.status(resObj.status).send({ data: resObj.data, msg: resObj.msg });
};

const deleteSingleNotice = async (req, res) => {
    // specify single notice using request query
    const findCond = await req.query;
    let resObj;

    // specify single notice using find condition
    let targetNotice = await Notice.findOne({ where: findCond });

    // case when notice cannot be specificed by given condition
    if (!targetNotice) {
        const msg = 'Cannot specify a notice with your condition';
        return res.status(400).send({ data: null, msg: msg });
    }

    // delete target notice
    await targetNotice.destroy();

    resObj = {
        data: null,
        msg: 'Your notice is successfully deleted',
        status: 200,
    };

    res.status(resObj.status).send({ data: resObj.data, msg: resObj.msg });
};

const showNoticeDetail = async (req, res) => {
    // specify single notice using request query
    const { company_id, hiring_position } = req.query;

    // join company table into notice table using SQL query
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
                // case when notice is matched by specified condition
                resObj.data = elem;
            } else {
                // case when company's other notice -> add id of notice
                otherNotices.push(elem.id);
            }
        }
    });
    resObj.data.otherNotices = otherNotices;

    res.status(resObj.status).send({ data: resObj.data, msg: resObj.msg });
};

module.exports = {
    allNotices,
    addSingleNotice,
    updateSingleNotice,
    deleteSingleNotice,
    showNoticeDetail,
};
