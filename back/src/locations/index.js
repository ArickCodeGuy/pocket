const mysql = require('mysql')
const config = require('./../config.js')

module.exports = {
    getLocation: (req, res) => {
        if (!req.query.location_id) {return res.send('specify location_id of location')}

        const connection = mysql.createConnection(config)
        connection.connect(config)
        connection.query(`SELECT id, name, description FROM pocket.locations WHERE id = ${req.query.location_id} LIMIT 1;`, (error,results,fields) => {
            connection.end()
            if (error){return res.send(error)}
            if (!results[0]) {return res.send('could not find row given query')}
            res.send(results[0])
        })
    },
    getNeighbours: (req, res) => {
        if (!req.query.location_id) {return res.send('specify location_id to find neighbours')}

        const connection = mysql.createConnection(config)
        connection.connect(config)
        connection.query(`SELECT id_to, route_name, route_time FROM pocket.location_routes WHERE id_from = ${req.query.location_id} LIMIT 10;`, (error,results,fields) => {
            connection.end()
            if (error){return res.send(error)}
            if (!results[0]) {return res.send('could not find row given query')}
            res.send(results[0])
        })
    }
}