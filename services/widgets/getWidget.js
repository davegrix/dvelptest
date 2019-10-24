'use strict';
const mySQL = require('../../config/connections');
const responseHelper = require('../../config/helper');

module.exports.fetch = (req, res) => {

    const widgetID = req.params.widgetID;
    const mysqlPool = mySQL.getPool();

    let sql = `select * from widgets where widgetID = ${widgetID}`;

    mysqlPool.getConnection((err, connection) => {
        connection.query(sql, (error, result) => {
            if(error) {
                connection.release();
                responseHelper.compileError('get Widget', error.message())
                    .then(compiledError => res.status(400).send(compiledError));
            } else {
                responseHelper.compileResponse(result, 'get Widget')
                    .then(compiledResult => res.send(compiledResult))
                    .catch(error => {
                        responseHelper.compileError('get Widget', error)
                            .then(compiledError => res.status(400).send(compiledError));
                    });
            }
        });
    });
};

