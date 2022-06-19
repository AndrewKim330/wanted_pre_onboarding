const { sequelize } = require('../../db/models');

(async () => {
    await sequelize.sync();
})();

const searchFromNotices = async (req, res) => {
    const { search } = req.query;
    if (search.length < 2) {
        return res.status(400).send({
            data: null,
            msg: 'Keyword should be more than 2 characters',
        });
    }
    let flag = false;
    const searchingRes = [];
    const joinedTable = await sequelize.query(
        'SELECT * FROM "Companies" LEFT OUTER JOIN "Notices" ON "Notices".company_id = "Companies".id'
    );
    joinedTable[0].forEach((elem1, idx) => {
        Object.entries(elem1).forEach((elem2, idx) => {
            const tempSearch = String(elem2[1]).search(search);
            if (tempSearch >= 0) {
                flag = true;
            }
        });
        if (flag) {
            searchingRes.push(elem1);
            flag = false;
        }
    });
    const resObj = {
        data: searchingRes,
        msg: 'Searching complete',
        status: 200,
    };
    if (resObj.data.length === 0) {
        const msg = 'No matching data';
        return res.status(400).send({ data: null, msg: msg });
    }
    res.status(resObj.status).send({ data: resObj.data, msg: resObj.msg });
};

module.exports = {
    searchFromNotices,
};
