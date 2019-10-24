'use strict';
const mySQL = require('../../config/connections');
const responseHelper = require('../../config/helper');

module.exports.delete = (req, res) => {

    const widgetID = req.params.widgetID;
    const mysqlPool = mySQL.getPool();

    let sql = `delete from widgets where widgetID = ${widgetID}`;

    mysqlPool.getConnection((err, connection) => {
        connection.query(sql, (error, ignore) => {
            if(error) {
                connection.release();
                responseHelper.compileError('delete Widget', error.message())
                    .then(compiledError => res.status(400).send(compiledError));
            } else {
                res.status(204).send();
            }
        });
    });
};