const queryDataBase = require('./../queryDatabase.js')
const {queryUserInfo} = require('./../functions.js')

module.exports = {
    async getLocation(req, res) {
        console.log('REQUEST: getLocation')
        try {
            if (!req.cookies.session_id) {throw {status: 400, text: 'you have to be logged in to query locations'}}
            const session_id = req.cookies.session_id

            let {character_id, location_id, move_end, move_direction} = await queryUserInfo({session_id: session_id})
            if (move_end !== 0 && new Date().getTime() >= parseInt(move_end)) {
                location_id = move_direction
                const result = await queryDataBase("UPDATE `pocket`.`users` SET `location_id` = '"+location_id+"', `move_end` = '0', `move_direction` = '0' WHERE (`character_id` = '"+character_id+"');")
            }

            const [location] = await queryDataBase(`SELECT id, name, description FROM pocket.locations WHERE id = ${location_id} LIMIT 1;`)
            const neighbours_array = await queryDataBase(`SELECT id_to, route_name, route_time FROM pocket.location_routes WHERE id_from = ${location_id} LIMIT 10;`)
            const neighbours = neighbours_array.map(item => ({
                id: item.id_to,
                name: item.route_name,
                time: item.route_time,
            }))
            if (!location) {throw {status: 400, text: 'could not find row given query'}}
            res.send({
                id: location.id,
                name: location.name,
                description: location.description,
                neighbours: neighbours
            })
        }
        catch(err) {
            console.log(err)
            res.status(err.status).send(err.text)
        }
    },
}