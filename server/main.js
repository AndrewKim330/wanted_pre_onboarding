const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
const { hiringRoute } = require('./src/router/hiringRoute');
const jsonParser = bodyParser.json();

app.use('/hiring', jsonParser, hiringRoute);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

module.exports = app;
