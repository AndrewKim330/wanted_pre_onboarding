const { sequelize } = require('../../db/models');

// synchronize to DB
(async () => {
    await sequelize.sync();
})();

const searchFromNotices = async (req, res) => {
    // extract keyword from request query
    const { search } = req.query;

    // keyword should be more then 2 characters
    if (search.length < 2) {
        return res.status(400).send({
            data: null,
            msg: 'Keyword should be more than 2 characters',
        });
    }

    // flag to consider whether notice has keyword or not
    let flag = false;
    const searchingRes = [];

    // join company table into notice table using SQL query
    const joinedTable = await sequelize.query(
        'SELECT * FROM "Companies" LEFT OUTER JOIN "Notices" ON "Notices".company_id = "Companies".id'
    );

    joinedTable[0].forEach((elem1, idx) => {
        Object.entries(elem1).forEach((elem2, idx) => {
            // searching position (if not, return -1)
            const searchPos = String(elem2[1]).search(search);

            if (searchPos >= 0) {
                flag = true;
            }
        });
        // case when there is searching keyword on notice
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

    // case when there is NOT matching keyword on entire notice
    if (resObj.data.length === 0) {
        const msg = 'No matching data';
        return res.status(400).send({ data: null, msg: msg });
    }

    res.status(resObj.status).send({ data: resObj.data, msg: resObj.msg });
};

module.exports = {
    searchFromNotices,
};
