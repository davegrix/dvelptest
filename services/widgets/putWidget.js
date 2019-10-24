'use strict';
const mySQL = require('../../config/connections');
const responseHelper = require('../../config/helper');

module.exports.put = (req, res) => {

    const mysqlPool = mySQL.getPool();
    const header = req.body;


    let sql = `update widgets set  brandColor1 =  '${header.brandColor1}',   brandColor2 = '${header.brandColor2}',    brandColor1Text = '${header.brandColor1Text}',    brandColor2Text = '${header.brandColor2Text}',    headerColor ='${header.headerColor}',    lightText='${header.lightText}',    darkText='${header.darkText}',    entryPointBackground='${header.entryPointBackground}',    companyName = '${header.companyName}',     welcomeMessage='${header.welcomeMessage}'     where widgetID = ${req.params.widgetID}`;

    console.log(sql);

    mysqlPool.getConnection((err, connection) => {
        connection.query(sql, (error, result) => {
            if(error) {
                connection.release();
                responseHelper.compileError('update Widget', error)
                    .then(compiledError => res.status(400).send(compiledError));
            } else {
                responseHelper.compileResponse(req.body, 'update widget')
                    .then(compiledResult => res.send(compiledResult))
                    .catch(error => {
                        responseHelper.compileError('update Widget', error)
                            .then(compiledError => res.status(400).send(compiledError));
                    });
            }
        });
    });

};