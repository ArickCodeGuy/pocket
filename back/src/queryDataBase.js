const mysql = require('mysql')
const config = require('./config.js')

module.exports = function(string) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config)
        connection.connect(config)
        connection.query(string, (error,results,fields) => {
            connection.end()
            console.log(`\n`,`Time: ${new Date().toString()}\n`, `Query: ${string}\n`, `Errors: ${error}\n`, `Results: ${JSON.stringify(results)}`)
            if (error) {return reject(error)}
            resolve(results)
        })
    })
}