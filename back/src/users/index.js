const mysql = require('mysql')
const config = require('./../config.js')

module.exports = {
    async getUserData(req, res) {
        try {
            const userInfo = await queryUserInfo(req, res)
            res.send(userInfo)
        }
        catch(err) {
            res.status(err.status)
            res.send(err.text)
        }
    },
    async getStatus(req, res) {
        try {
            const queryResponse = await queryUserStatus(req.cookies.session_id)
            return res.send(queryResponse)
        }
        catch(err) {
            res.status(err.status)
            return res.send(err.text)
        }
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
    async login(req, res) {
        try {
            const { id: user_id } = await auth(req, res)
            const { session_id } = await createSession(user_id)
            res.send({session_id: session_id})
        }
        catch(err) {
            res.status(err.status)
            res.send(err.text)
        }
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
    async goToLocation(req, res) {
        try {
            const { id: user_id } = await queryUserStatus(req.cookies.session_id)
            const { location_id: user_location } = await queryUserInfo(req, res)
            const { route_time } = await queryRoute(user_location, req.query.location_id)
            res.send({
                route_time: route_time
            })
        }
        catch(err) {
            res.status(err.status)
            res.send(err.text)
        }
    },
}

// @TODO do a normal id generation
function generate_id() {
    return (Math.random() + 1).toString(36).substring(2)
}

function queryUserStatus(session_id) {
    return new Promise((resolve, reject) => {
        if (!session_id) {return reject({status: 400, loged: false, text: 'No session_id provided'})}

        const connection = mysql.createConnection(config)
        connection.connect(config)
        connection.query(`SELECT user_id, time_expires FROM pocket.sessions WHERE session_id = '${session_id}' LIMIT 1;`, (error,results,fields) => {
            connection.end();
            if (error) {return reject({status: 500, loged: false, text: 'mysql query error'})}

            if (!results.length) {return reject({status: 404, loged: false, text: 'No user found given session_id'})}
            if (Date.now() > results[0].time_expires) {return reject({status: 401, loged: false, text: 'session_id is exprired'})}

            resolve({
                loged: true,
                id: results[0].user_id
            })
        })
    })
}

function queryUserInfo(req, res) {
    return new Promise(async (resolve, reject) => {
        if (!req.query.login && !req.query.id && !req.cookies.session_id) {return reject({status: 400, text: 'specify name or id or your session_id to look for'})}        

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

        let queryStr
        if (req.query.login) {
            queryStr = `SELECT ${columns} FROM pocket.users WHERE login = '${req.query.login}' LIMIT 1;`
        }else if (req.query.id) {
            queryStr = `SELECT ${columns} FROM pocket.users WHERE id = '${req.query.id}' LIMIT 1;`
        }else if (req.cookies.session_id) {
            try {
                let { id } = await queryUserStatus(req.cookies.session_id)
                queryStr = `SELECT ${columns} FROM pocket.users WHERE id = '${id}' LIMIT 1;`
            }
            catch(err) {
                return reject(err)
            }
        }

        const connection = mysql.createConnection(config)
        connection.connect(config)
        connection.query(queryStr, (error,results,fields) => {
            connection.end();
            if (error) {return reject({status: 500, text: 'mysql query error'})}
            if (!results.length) {return reject({status: 404, text: 'Could not find any user_id given session_id'})}
            resolve(results[0])
        })
    })
}

function auth(req, res) {
    return new Promise((resolve, reject) => {
        if (!req.query.login || !req.query.password) {return reject({status: 400, text: 'Specify name and password for login first'})}

        const connection = mysql.createConnection(config)
        connection.connect(config)
        connection.query(`SELECT login, id FROM pocket.users WHERE login = '${req.query.login}' AND password = '${req.query.password}' LIMIT 1;`, (error,results,fields) => {
            connection.end()
            if (error) {return reject({status: 500, text: 'mysql error'})}
            if (!results[0]) {return reject({status: 403, text: 'Login or password is incorrect'})}
            resolve({
                login: results[0].login,
                id: results[0].id
            })
        })
    })
}

function createSession(user_id) {
    return new Promise((resolve, reject) => {
        const session_id = generate_id()
        const time = Date.now()
        // 604800000 -> 7 days
        const time_expires = time + 604800000
        const connection = mysql.createConnection(config)
        connection.connect(config)
        connection.query("INSERT INTO `pocket`.`sessions` (`user_id`, `session_id`, `time_created`, `time_expires`) VALUES ('"+user_id+"', '"+session_id+"', '"+time+"', '"+time_expires+"');", (error,results,fields) => {
            connection.end()
            if (error) {return reject({status: 500, text: 'Mysql error. Probably invalid user_id'})}
            resolve({
                session_id: session_id,
            })
        })
    })
}

function queryRoute(location_from, location_to) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config)
        connection.connect(config)
        connection.query(`SELECT route_time, id_to, route_name FROM pocket.location_routes WHERE id_from = ${location_from} AND id_to = ${location_to} LIMIT 1;`, (error,results,fields) => {
            connection.end()
            if (error) {return reject({status: 500, text: 'this route does not exist'})} // this route does not exist
            if (!results.length) {return reject({status: 404, text: 'Can not find route!'})}

            resolve(results[0])
        })
    })
}