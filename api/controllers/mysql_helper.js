const path = require('path');
const fetch = require('node-fetch');

exports.mysql_close_connection = async (connection) => {
    try {
        // CLOSE CONNECTION
        if (connection) {
            console.log('Closing MYSQL connection after success');
            await connection.end();
            connection = null;
        }
    } catch (error) {
        throw error;
    }
}