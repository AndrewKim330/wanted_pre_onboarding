const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
const { hiringRoute } = require('./src/router/hiringRoute');
const { searchingRoute } = require('./src/router/searchingRoute');
const jsonParser = bodyParser.json();

app.use('/hiring', jsonParser, hiringRoute);
app.use('/searching', jsonParser, searchingRoute);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

module.exports = app;
