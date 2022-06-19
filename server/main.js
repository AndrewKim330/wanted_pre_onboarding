const express = require('express');
const app = express();
const port = 4000;
const { hiringRoute } = require('./src/router/hiringRoute');
app.use('/hiring', hiringRoute);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

module.exports = app;
