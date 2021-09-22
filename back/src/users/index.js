const mysql = require('mysql')
const config = require('./../config.js')

module.exports = {
    getUser: (req, res) => {
        if (!req.query.login && !req.query.id && !req.cookies.session_id) {return res.send('specify name or id or your session_id to look for')}

        let columns = `
            login,
            profile_picture,
            lvl,
            experience,
            class_id,
            location_id,
            base_strength,
            base_stamina,
            base_agility,
            inventory_head,
            inventory_boots,
            inventory_left_hand,
            inventory_right_hand,
            inventory_neck`

        const connection = mysql.createConnection(config)
        connection.connect(config)

        let queryStr
        if (req.query.id) {
            queryStr = `SELECT ${columns} FROM pocket.users WHERE id = '${req.query.id}' LIMIT 1;`
            connection.query(queryStr, (error,results,fields) => getUserData(error,results,fields))
        }else if (req.query.login) {
            queryStr = `SELECT ${columns} FROM pocket.users WHERE login = '${req.query.login}' LIMIT 1;`
            connection.query(queryStr, (error,results,fields) => getUserData(error,results,fields))
        }else if (req.cookies.session_id) {
            connection.query(`SELECT user_id, time_expires FROM pocket.sessions WHERE session_id = '${req.cookies.session_id}' LIMIT 1;`, (error,results,fields) => {
                if (error) {connection.end(); return res.send(error)}

                if (!results.length) {connection.end(); return res.send('Could not find any user_id given session_id')}
                if (Date.now() > results[0].time_expires) {connection.end(); return res.send('Expired session_id given')}

                queryStr = `SELECT ${columns} FROM pocket.users WHERE id = '${results[0].user_id}' LIMIT 1;`
                connection.query(queryStr, (error,results,fields) => getUserData(error,results,fields))
            })
        }

        let getUserData = (error,results,fields) => {
            connection.end()
            if (error){return res.send(error)}
            if (!results.length) {return res.send('could not find row given query')}
            let final = Object.assign({}, results[0], {
                calculated_strength: null,
                calculated_stamina: null,
                calculated_agility: null
            })

            res.send(results[0])
        }
    },
    checkStatus: (req, res) => {
        if (!req.cookies.session_id) {return res.send({loged: false})}

        const connection = mysql.createConnection(config)
        connection.connect(config)
        connection.query(`SELECT user_id, time_expires FROM pocket.sessions WHERE session_id = '${req.cookies.session_id}' LIMIT 1;`, (error,results,fields) => {
            connection.end();
            if (error) {return res.send({loged: false})}

            if (!results.length) {return res.send({loged: false})}
            if (Date.now() > results[0].time_expires) {return res.send({loged: false})}

            res.send({loged: true})
        })
    },
    register: (req, res) => {
        if (!req.query.login || !req.query.password) {return res.send('Provide login and password')}

        const connection = mysql.createConnection(config)
        connection.connect(config)
        connection.query("INSERT INTO pocket.users (`login`, `password`) VALUES ('" + req.query.login + "', '"+ req.query.password +"');", (error,results,fields) => {
            connection.end()
            if (error) {return res.send('login already exists')}
            res.send('register success!')
        })
    },
    delUser: (req, res) => {
        res.send('working on it')
    },
    login: (req, res) => {
        if (!req.query.login || !req.query.password) {return res.status(400).send('Specify name and password for login first')}

        const connection = mysql.createConnection(config)
        connection.connect(config)
        connection.query(`SELECT login, id FROM pocket.users WHERE login = '${req.query.login}' AND password = '${req.query.password}' LIMIT 1;`, (error,results,fields) => {
            if (error) {connection.end(); return res.status(500).send(error)}

            if (!results[0]) {connection.end(); return res.status(403).send('Login or password is incorrect')}

            const user_id = results[0].id
            const session_id = generate_id()
            const time = Date.now()
            // 604800000 -> 7 days
            const time_expires = time + 604800000
            connection.query("INSERT INTO `pocket`.`sessions` (`user_id`, `session_id`, `time_created`, `time_expires`) VALUES ('"+user_id+"', '"+session_id+"', '"+time+"', '"+time_expires+"');", (error,results,fields) => {
                connection.end()
                if (error) {return res.status(500).send(error)}

                res.send({session_id: session_id})
            })
        })
    },
    usersList: (req, res) => {
        if (!req.query.location_id) {return res.send('specify location to get list of users')}

        const connection = mysql.createConnection(config)
        connection.connect(config)
        connection.query(`SELECT login, lvl, profile_picture FROM pocket.users WHERE location_id = ${req.query.location_id} LIMIT 10;`, (error,results,fields) => {
            connection.end()
            if (error) {return res.send(error)}
            if (!results.length) {return res.send('No one on this position')}
            res.send(results)
        })
    },
    goToLocation: (req, res) => {
        // @@TODO session id instead of player id
        if (!req.cookies.session_id || !req.query.location_id) {return res.send('Specify location to go to and person to go to')}

        const connection = mysql.createConnection(config)
        connection.connect(config)
        connection.query(`SELECT user_id, time_expires FROM pocket.sessions WHERE session_id = ${req.cookies.session_id} LIMIT 1;`, (error, results, fileds) => {
            if (error) {connection.end(); return res.send(error)}
            if (!results.length) {connection.end(); return res.send('no user_id found given session_id')} // no user_id found given session_id

            let current_time = Date.now()
            if (current_time > results[0].time_expires) {connection.end(); return res.send('session_id is expired')}

            let user_id = results[0].user_id

            connection.query(`SELECT location_id FROM pocket.users WHERE id = ${user_id} LIMIT 1;`, (error,results,fields) => {
                if (error) {connection.end(); return res.send(error)} // no error should occur at this point but just in case
                if (!results.length) {connection.end(); return res.send('Can not find player with this id')}

                let player_position = results[0].location_id
                connection.query(`SELECT route_time FROM pocket.location_routes WHERE id_from = ${player_position} AND id_to = ${req.query.location_id} LIMIT 1;`, (error,results,fields) => {
                    if (error) {connection.end(); return res.send('this route does not exist')} // this route does not exist

                    if (!results.length) {connection.end(); return res.send('Can not find route!')}

                    connection.end()
                    res.send(results[0])
                })
            })
        })
    },
    asdf(req,res) {
        let status = getStatus(req, res)
        status.then((a) => {
            res.send(a)
        })
        .catch((a) => {
            res.send(a)
        })
    }
}

// @TODO do a normal id generation
const generate_id = () => (Math.random() + 1).toString(36).substring(2)
const getStatus = (req, res) => new Promise((resolve, reject) => {
    if (!req.cookies.session_id) {return resolve({loged: false})}

    const connection = mysql.createConnection(config)
    connection.connect(config)
    connection.query(`SELECT user_id, time_expires FROM pocket.sessions WHERE session_id = '${req.cookies.session_id}' LIMIT 1;`, (error,results,fields) => {
        connection.end();
        if (error) {return resolve({loged: false})}

        if (!results.length) {return resolve({loged: false})}
        if (Date.now() > results[0].time_expires) {return resolve({loged: false})}

        resolve({loged: true})
    })
})