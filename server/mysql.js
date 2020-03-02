const config = require('./config');

let knex = require('knex')({
    client: 'mysql',
    connection: {
        host: config.mysql.host,
        port: config.mysql.post,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.db
    }
});

module.exports = {mysql: knex};