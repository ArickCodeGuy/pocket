const mysql = require('mysql')
const config = require('./config.js')

module.exports = function(string) {
    return new Promise((resolve, reject) => {
        console.log('\n', 'Function: queryDataBase')
        const connection = mysql.createConnection(config)
        connection.connect(config)
        connection.query(string, (error,results,fields) => {
            connection.end()
            console.log(`Time: ${new Date().toString()}\n`, `Query: ${string}\n`, `Errors: ${error}\n`, `Results: ${JSON.stringify(results)}`)
            if (error) {return reject({status: 500, text: error})}

            resolve(results)
        })
    })
}