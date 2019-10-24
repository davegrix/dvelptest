/* eslint-disable no-console */
const fs = require('fs'); const path = require('path'); const http = require('http'); const
    logger = require('morgan');


const app = require('express')();
const cors = require('cors');
const oasTools = require('oas-tools');
const jsYaml = require('js-yaml');
const express = require('express');

const bodyParser = require('body-parser');
app.use(bodyParser.json({
    strict: false
}));

const port = (process.env.NODE_ENV === 'development') ? 3000 :  5000;
const swaggerOptions = {
    controllers: path.join(__dirname, './controllers'),
    strict: true,
    router: true,
    validator: true,
    docs: {
        apiDocs: '/api-docs',
        apiDocsPrefix: '',
        swaggerUi: '/docs',
        swaggerUiPrefix: '',
    },
    logLevel: (process.env.NODE_ENV === 'production') ? 'error' : 'debug'
};
app.use(cors());
app.use('/static',express.static('public'));
app.get('/', (ignore, res) => {
    res.redirect('/docs');
});

oasTools.configure(swaggerOptions);
const spec = fs.readFileSync(path.join(__dirname, 'api/openapi.yaml'), 'utf8');
const swaggerDoc = jsYaml.safeLoad(spec);
oasTools.initialize(swaggerDoc, app, () => {
    app.use(logger((process.env.NODE_ENV === 'development') ? 'dev' : 'short'), () => {
    });


    // databaseSetup.setupInstances();
    http.createServer(app).listen(port, () => {
        const serverType = (process.env.NODE_ENV === 'development') ? 'Development' : 'Production';
        console.log(`${serverType} Server launched on port ${port}`);
        console.log('docs available at /docs');

    });
});
