const queryDataBase = require('./../queryDatabase.js')

module.exports = {
    async getLocation(req, res) {
        if (!req.query.location_id && !req.cookies.session_id) {return res.status(400).send('specify location_id of location, or session_id')}

        let location_id
        if (req.query.location_id) {
            location_id = req.query.location_id
        }else {
            try {
                const session_query = await queryDataBase(`SELECT user_id, time_expires FROM pocket.sessions WHERE session_id = '${req.cookies.session_id}' LIMIT 1;`)
                const user_id = session_query[0].user_id
                const user_query = await queryDataBase(`SELECT location_id FROM pocket.users WHERE user_id = '${user_id}' LIMIT 1;`)
                location_id = user_query[0].location_id
            }
            catch(err) {
                res.status(err.status)
                res.send(err.text)
                return
            }
        }

        try {
            const result = await queryDataBase(`SELECT id, name, description FROM pocket.locations WHERE id = ${location_id} LIMIT 1;`)
            const location = result[0]
            const neighbours_query = await queryDataBase(`SELECT id_to, route_name, route_time FROM pocket.location_routes WHERE id_from = ${location_id} LIMIT 10;`)
            const neighbours = neighbours_query.map(item => {
                return {
                    id: item.id_to,
                    name: item.route_name,
                    time: item.route_time,
                }
            })
            if (!result.length) {throw {status: 400, text: 'could not find row given query'}}
            res.send({
                id: location.id,
                name: location.name,
                description: location.description,
                neighbours: neighbours
            })
        }
        catch(err) {
            // @@TODO доделать
            res.status(err.status)
            res.send(err.text)
        }
    },
}