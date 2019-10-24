'use strict';

const PAVERS_LIVE = {
    user: 'sa',
    password: 'master',
    server: '192.168.0.49',
    database: 'pavers',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

const PAVERS_DEV = {
    user: 'posix_dev',
    password: 'Pavers123?',
    server: '192.168.0.208',
    database: 'Pavers',
    port: 1442,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};
const RMIS_LIVE = {
    user: 'sa',
    password: 'master',
    server: '192.168.0.49',
    database: 'RMIS',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

const RMIS_DEV = {
    user: 'posix_dev',
    password: 'Pavers123?',
    server: '192.168.0.208',
    database: 'Rmis',
    port: 1442,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

const XT_LIVE = {
    user: 'sa',
    password: 'master',
    server: '192.168.0.7',
    database: 'StilettoXT',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

const XT_DEV = {
    user: 'posix_dev',
    password: 'Pavers123?',
    server: '192.168.0.208',
    database: 'StilettoXT',
    port: 1442,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};


module.exports = {
    PAVERS_DEV,
    PAVERS_LIVE,
    XT_DEV,
    XT_LIVE,
    RMIS_DEV,
    RMIS_LIVE

};






