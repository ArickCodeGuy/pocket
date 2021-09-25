const mysql = require('mysql')
const config = require('./../config.js')
const hash = require('./../hash.js')

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
    async register(req, res) {
        if (!req.query.login || !req.query.password) {return res.status(400).send('Provide login and password')}

        const hashPas = hash(`${req.query.login}${req.query.password}`)
        const connection = mysql.createConnection(config)
        connection.connect(config)
        connection.query("INSERT INTO pocket.users_essentials (`login`, `password`) VALUES ('" + req.query.login + "', '"+ hashPas +"');", async (error,results,fields) => {
            connection.end()
            if (error) {return res.status(400).send('login already exists')}
            try {
                await insertCharacter(results.insertId, req.query.login)
                res.send('Register success')
            }
            catch(err) {
                res.status(err.status)
                res.send(err.text)
            }
        })
    },
    delUser: (req, res) => {
        res.send('working on it')
    },
    async login(req, res) {
        try {
            const { id: user_id } = await queryUserEssentials(req.query.login, req.query.password)
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

function queryUserStatus(session_id) {
    return new Promise(async (resolve, reject) => {
        if (!session_id) {return reject({status: 400, loged: false, text: 'No session_id provided'})}

        try {
            const result = await queryDataBase(`SELECT user_id, time_expires FROM pocket.sessions WHERE session_id = '${session_id}' LIMIT 1;`)
            if (!result.length) {return reject({status: 404, loged: false, text: 'No user found given session_id'})}
            if (Date.now() > result[0].time_expires) {return reject({status: 401, loged: false, text: 'session_id is exprired'})}
            resolve({
                loged: true,
                id: result[0].user_id
            })
        }
        catch(err) {
            reject({status: 500, loged: false, text: 'mysql query error'})
        }
    })
}

function queryUserInfo(req, res) {
    return new Promise(async (resolve, reject) => {
        if (!req.query.name && !req.query.id && !req.cookies.session_id) {return reject({status: 400, text: 'specify name or id or your session_id to look for'})}

        let queryStr
        if (req.query.name) {
            queryStr = `SELECT * FROM pocket.users WHERE name = '${req.query.name}' LIMIT 1;`
        }else if (req.query.id) {
            queryStr = `SELECT * FROM pocket.users WHERE character_id = '${req.query.id}' LIMIT 1;`
        }else if (req.cookies.session_id) {
            try {
                const { id: user_id } = await queryUserStatus(req.cookies.session_id)
                const result = await queryDataBase("SELECT active_character_id FROM pocket.users_essentials WHERE id = "+user_id+";")
                queryStr = `SELECT * FROM pocket.users WHERE character_id = '${result[0].active_character_id}' LIMIT 1;`
            }
            catch(err) {
                return reject(err)
            }
        }

        try {
            const result = await queryDataBase(queryStr)
            if (!result.length) {return reject({status: 404, text: 'Could not find any character_id given session_id'})}
            resolve(result[0])
        }
        catch(err) {
            reject({status: 500, text: 'mysql query error!'})
        }
    })
}

function queryUserEssentials(login, password) {
    return new Promise(async (resolve, reject) => {
        if (!login || !password) {return reject({status: 400, text: 'Specify name and password for login first'})}

        const hashPas = hash(`${login}${password}`)

        try {
            const result = await queryDataBase(`SELECT id, login, access_level, email, active_character_id FROM pocket.users_essentials WHERE login = '${login}' AND password = '${hashPas}' LIMIT 1;`)
            if (!result.length) {return reject({status: 403, text: 'Login or password is incorrect'})}
            resolve(result[0])
        }
        catch(err) {
            reject({status: 500, text: 'mysql error'})
        }
    })
}

function createSession(user_id) {
    return new Promise(async (resolve, reject) => {
        const session_id = hash()
        const time = Date.now()
        // 604800000 -> 7 days
        const time_expires = time + 604800000
        try {
            const result = await queryDataBase("INSERT INTO `pocket`.`sessions` (`user_id`, `session_id`, `time_created`, `time_expires`) VALUES ('"+user_id+"', '"+session_id+"', '"+time+"', '"+time_expires+"');")
            resolve({
                session_id: session_id,
            })
        }
        catch(err) {
            reject({status: 500, text: 'User already exists'})
        }
    })
}

function queryRoute(location_from, location_to) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await queryDataBase(`SELECT route_time, id_to, route_name FROM pocket.location_routes WHERE id_from = ${location_from} AND id_to = ${location_to} LIMIT 1;`)
            if (!result.length) {return reject({status: 404, text: 'Can not find route!'})}
            resolve(result[0])
        }
        catch(err) {
            reject({status: 500, text: 'this route does not exist'})
        }
    })
}

function insertUser(login, password) {
    // @@TODO
}

function insertCharacter(user_id, name) {
    return new Promise(async (resolve, reject) => {
        try {
            const insertResult = await queryDataBase("INSERT INTO `pocket`.`users` (`user_id`, `name`) VALUES ('"+user_id+"', '"+name+"');")
            await queryDataBase("UPDATE `pocket`.`users_essentials` SET `active_character_id` = '"+insertResult[0].insertId+"' WHERE (`id` = '"+user_id+"');")
            resolve('Success')
        }
        catch(err) {
            reject({status: 400, text:'Character name already exists'})
        }
    })
}

function queryDataBase(string) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config)
        connection.connect(config)
        connection.query(string, (error,results,fields) => {
            connection.end()
            console.log(`Time: ${new Date().toString()}\n`, `Query: ${string}\n`, `Errors: ${error}\n`, `Results: ${JSON.stringify(results)}\n`)
            if (error) {return reject(error)}
            resolve(results)
        })
    })
}