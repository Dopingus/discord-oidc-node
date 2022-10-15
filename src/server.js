const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

function createServer() {
    const app = express()
    app.set('trust proxy', true)
    app.use(cors())
    app.use(helmet.hidePoweredBy())
    app.use(express.urlencoded({
        extended: false
    }));
    return app;
}

module.exports = { createServer };
