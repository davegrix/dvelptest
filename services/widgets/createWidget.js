'use strict';
const mySQL = require('../../config/connections');
const responseHelper = require('../../config/helper');

module.exports.create = (req, res) => {
    const mysqlPool = mySQL.getPool();
    const header = req.body;

    console.log(header);

    let sql = `insert into widgets(brandColor1, brandColor2, brandColor1Text, brandColor2Text, headerColor, lightText, darkText, entryPointBackground, companyName, welcomeMessage) values ('${header.brandColor1}','${header.brandColor2}', '${header.brandColor1Text}', '${header.brandColor2Text}', '${header.headerColor}', '${header.lightText}', '${header.darkText}', '${header.entryPointBackground}', '${header.companyName}', '${header.welcomeMessage}')`;

    console.log(sql);
    mysqlPool.getConnection((err, connection) => {
        connection.query(sql, (error, result) => {
            if(error) {
                connection.release();
                responseHelper.compileError('insert Widget', error)
                    .then(compiledError => res.status(400).send(compiledError));
            } else {
                const newWidget = {...req.body};
                newWidget.widgetId = result.insertId;

                responseHelper.compileResponse(newWidget, 'insert widget')
                    .then(compiledResult => res.status(201).send(compiledResult))
                    .catch(error => {
                        responseHelper.compileError('insert Widget', error)
                            .then(compiledError => res.status(400).send(compiledError));
                    });
            }
        });
    });
};