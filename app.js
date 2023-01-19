const express = require('express');
const bodyParser = require('body-parser');
const apicache = require('apicache-plus');
const { fetchData } = require('./service');

const app = express();
const port = 3000;
let cache = apicache.middleware

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cache('1 minutes'))

app.get('/fetch/stock_crypto/:symbol?', (req, res) => {
    fetchData(req, res).then((data) => {
        req.apicacheGroup = req.params.symbol
        res.send(data)
    })
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

