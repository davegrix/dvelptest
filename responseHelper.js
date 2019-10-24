'use strict';
const mysql = require('mysql2/promise');
const currPool = {};
const { CHECK_PERMISSION } = require('@paversltd/pps');


module.exports.compileResponse = async (token, array, tClass) => {
    return {
        deviceToken: token,
        [tClass]: array,
    };
};

module.exports.compileResponseArray = async (array, tClass) => {
    return {
        [tClass]: array,
    };
};
module.exports.compileResponseObject = async (object, tClass) => {
    return {
        [tClass]: object,
    };
};

module.exports.compileError = async (fName, err) => {
    return {
        atFunction: fName,
        errorMessage: err,
    };
};

module.exports.runMySQLProcedure = (procedure) => {

    return new Promise((resolve, reject) => {
        try {
            const pool = getMySQLPool();
            pool.query(procedure, '');
            resolve();
        } catch (e) {
            reject(e.message);
        }
    });
};

const getMySQLPool = () => {

    let db = process.env.NODE_ENV === 'development' ? 'stilettoxt_dev' : 'stilettoxt';
    if (currPool.pool) {
        return currPool.pool;
    }
    currPool.pool = mysql.createPool({
        host: '192.168.0.41',
        user: 'stiletto',
        password: 'stiletto123',
        database: db
    });
    return currPool.pool;

};




module.exports.checkPermission = (jwt, permission) => new Promise((resolve, reject) => {

    const checkPerm = new CHECK_PERMISSION();

    checkPerm.checkPermission(jwt, permission)
        .then((result) => {
            const returnCode = result.code;
            const returnMessage = result.message;
            const deviceUUID = result.deviceUUID;

            if (returnCode === 200) {
                if (returnMessage) {
                    resolve(deviceUUID);
                } else {
                    reject('Unauthorized');
                }
            } else {
                reject(returnMessage);
            }
        })
        .catch(() => {
            reject('Could not check permission');
        });
});



