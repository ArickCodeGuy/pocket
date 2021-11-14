const hash = require('./../hash.js')
const queryDataBase = require('./../queryDatabase.js')

module.exports = {
    async getUserData(req, res) {
        try {
            console.log('REQUEST: getUserData')
            const user = await queryUserInfo({
                character_name: req.query.name,
                character_id: req.query.id,
                session_id: req.cookies.session_id
            })
            res.send(user)
        }
        catch(err) {
            console.log(err)
            res.status(err.status).send(err.text)
        }
    },
    async getStatus(req, res) {
        try {
            console.log('REQUEST: getStatus')
            const queryResponse = await queryUserStatus(req.cookies.session_id)
            res.send(queryResponse)
        }
        catch(err) {
            console.log(err)
            res.status(err.status).send(err.text)
        }
    },
    async register(req, res) {
        if (!req.query.login || !req.query.password) {return res.status(400).send('Provide login and password')}

        const hashPas = hash(`${req.query.login}${req.query.password}`)
        try {
            console.log('REQUEST: register')
            const insertUserQuery = await queryDataBase("INSERT INTO pocket.users_essentials (`login`, `password`) VALUES ('" + req.query.login + "', '"+ hashPas +"');")
            await insertCharacter(insertUserQuery.insertId, req.query.login)
            res.send('Register success')
        }
        catch(err) {
            console.log(err)
            res.status(err.status).send(err.text)
        }
    },
    delUser: (req, res) => {
        // @@TODO
        res.send('working on it')
    },
    async login(req, res) {
        try {
            console.log('REQUEST: login')
            const { id: user_id } = await queryUserEssentials(req.query.login, req.query.password)
            const { session_id } = await createSession(user_id)
            res.send({session_id: session_id})
        }
        catch(err) {
            console.log(err)
            res.status(err.status).send(err.text)
        }
    },
    async usersList(req, res) {
        console.log('REQUEST: usersList')
        if (!req.query.location_id) {return res.send('specify location to get list of users')}
        try {
            const usersListQuery = await queryDataBase(`SELECT login, lvl, profile_picture FROM pocket.users WHERE location_id = ${req.query.location_id} LIMIT 10;`)
            res.send(usersListQuery)
        }
        catch(err) {
            console.log(err)
            res.status(err.status).send(err.text)
        }
    },
    async goToLocation(req, res) {
        console.log('REQUEST: goToLocation')
        try {
            const { id: user_id } = await queryUserStatus(req.cookies.session_id)
            const { location_id: character_location, character_id } = await queryUserInfo({session_id: req.query.session_id})
            const { route_time } = await queryRoute(character_location, req.query.location_id)

            // @TODO delay implementation
            const { queryResult } = await queryDataBase("UPDATE `pocket`.`users` SET `location_id` = '"+req.query.location_id+"' WHERE (`character_id` = '"+character_id+"');")

            res.send({
                location_id: req.query.location_id
            })
            // res.send({
            //     route_time: route_time
            // })
        }
        catch(err) {
            console.log(err)
            res.status(err.status).send(err.text)
        }
    },
    async setAttributes(req, res) {
        console.log('REQUEST: setAttributes')
        try {
            if (!req.body.base_strength) {throw {status: 400, text: 'no base_strength provided'}}
            if (!req.body.base_agility) {throw {status: 400, text: 'no base_agility provided'}}
            if (!req.body.base_stamina) {throw {status: 400, text: 'no base_stamina provided'}}
            if (!req.body.base_wisdom) {throw {status: 400, text: 'no base_wisdom provided'}}
            if (!req.body.base_luck) {throw {status: 400, text: 'no base_luck provided'}}

            const character = await queryUserInfo({session_id: req.cookies.session_id})

            const str_diff = req.body.base_strength - character.base_strength
            const agi_diff = req.body.base_agility - character.base_agility
            const sta_diff = req.body.base_stamina - character.base_stamina
            const wis_diff = req.body.base_wisdom - character.base_wisdom
            const luc_diff = req.body.base_luck - character.base_luck

            if (str_diff < 0 || isNaN(str_diff)) {throw {status: 400, text: 'illegal base_strength provided'}}
            if (agi_diff < 0 || isNaN(agi_diff)) {throw {status: 400, text: 'illegal base_agility provided'}}
            if (sta_diff < 0 || isNaN(sta_diff)) {throw {status: 400, text: 'illegal base_stamina provided'}}
            if (wis_diff < 0 || isNaN(wis_diff)) {throw {status: 400, text: 'illegal base_wisdom provided'}}
            if (luc_diff < 0 || isNaN(luc_diff)) {throw {status: 400, text: 'illegal base_luck provided'}}

            const attrs_spent = str_diff + agi_diff + sta_diff + wis_diff + luc_diff
            const attrs_left = character.free_attributes - attrs_spent

            if (attrs_left < 0) {throw {status: 400, text: 'spent more attrs than avaliable'}}

            await queryDataBase("UPDATE `pocket`.`users` SET `base_strength` = '"+req.body.base_strength+"', `base_stamina` = '"+req.body.base_agility+"', `base_agility` = '"+req.body.base_stamina+"', `base_wisdom` = '"+req.body.base_wisdom+"', `base_luck` = '"+req.body.base_luck+"', `free_attributes` = '"+attrs_left+"' WHERE (`character_id` = '"+character.character_id+"');")
            res.send({
                base_strength: req.body.base_strength,
                base_agility: req.body.base_agility,
                base_stamina: req.body.base_stamina,
                base_wisdom: req.body.base_wisdom,
                base_luck: req.body.base_luck,
                free_attributes: attrs_left,
            })
        }
        catch(err) {
            console.log(err)
            res.status(err.status).send(err.text)
        }
    }
}

function queryUserStatus(session_id) {
    return new Promise(async (resolve, reject) => {
        console.log('function: queryUserStatus')
        try {
            if (!session_id) {throw {status: 400, text: 'No session_id provided'}}

            const result = await queryDataBase(`SELECT user_id, time_expires FROM pocket.sessions WHERE session_id = '${session_id}' LIMIT 1;`)
            if (!result.length) {throw {status: 404, text: 'No user found given session_id'}}
            if (Date.now() > result[0].time_expires) {throw {status: 401, text: 'session_id is exprired'}}
            resolve({
                loged: true,
                id: result[0].user_id
            })
        }
        catch(err) {
            console.log(err)
            reject(err)
        }
    })
}

function queryUserInfo({character_name, character_id, session_id}) {
    return new Promise(async (resolve, reject) => {
        console.log('function: queryUserInfo')
        try {
            if (!character_name && !character_id && !session_id) {throw {status: 400, text: 'specify name or id or your session_id to look for'}}

            let queryStr
            if (character_name) {
                queryStr = `SELECT * FROM pocket.users WHERE name = '${character_name}';`
            }else if (character_id) {
                queryStr = `SELECT * FROM pocket.users WHERE character_id = '${character_id}';`
            }else if (session_id) {
                const { id: user_id } = await queryUserStatus(session_id)
                const result = await queryDataBase("SELECT active_character_id FROM pocket.users_essentials WHERE id = "+user_id+";")
                queryStr = `SELECT * FROM pocket.users WHERE character_id = '${result[0].active_character_id}';`
            }
            const result = await queryDataBase(queryStr)
            if (!result[0]) {throw {status: 404, text: 'No matches found'}}
            resolve(result[0])
        }
        catch(err) {
            console.log(err)
            reject(err)
        }
    })
}

function queryUserEssentials(login, password) {
    return new Promise(async (resolve, reject) => {
        console.log('function: queryUserEssentials')
        try {
            if (!login || !password) {throw {status: 400, text: 'Specify name and password for login first'}}
            const hashPas = hash(`${login}${password}`)
            const result = await queryDataBase(`SELECT id, login, access_level, email, active_character_id FROM pocket.users_essentials WHERE login = '${login}' AND password = '${hashPas}' LIMIT 1;`)
            if (!result[0]) {throw {status: 403, text: 'Login or password is incorrect'}}
            resolve(result[0])
        }
        catch(err) {
            console.log(err)
            reject(err)
        }
    })
}

function createSession(user_id) {
    return new Promise(async (resolve, reject) => {
        console.log('function: createSession')
        try {
            const session_id = hash()
            const time = Date.now()
            // 604800000 -> 7 days
            const time_expires = time + 604800000
            const result = await queryDataBase("INSERT INTO `pocket`.`sessions` (`user_id`, `session_id`, `time_created`, `time_expires`) VALUES ('"+user_id+"', '"+session_id+"', '"+time+"', '"+time_expires+"');")
            resolve({
                session_id: session_id,
            })
        }
        catch(err) {
            console.log(err)
            reject(err)
        }
    })
}

function queryRoute(location_from, location_to) {
    return new Promise(async (resolve, reject) => {
        console.log('function: queryRoute')
        try {
            const result = await queryDataBase(`SELECT route_time, id_to, route_name FROM pocket.location_routes WHERE id_from = ${location_from} AND id_to = ${location_to} LIMIT 1;`)
            if (!result.length) {throw {status: 404, text: 'Can not find route!'}}
            resolve(result[0])
        }
        catch(err) {
            console.log(err)
            reject(err)
        }
    })
}

function insertUser(login, password) {
    // @@TODO
}

function insertCharacter(user_id, name) {
    return new Promise(async (resolve, reject) => {
        console.log('function: insertCharacter')
        try {
            const insertResult = await queryDataBase("INSERT INTO `pocket`.`users` (`user_id`, `name`) VALUES ('"+user_id+"', '"+name+"');")
            await queryDataBase("UPDATE `pocket`.`users_essentials` SET `active_character_id` = '"+insertResult[0].insertId+"' WHERE (`id` = '"+user_id+"');")
            resolve('Success')
        }
        catch(err) {
            console.log(err)
            reject(err)
        }
    })
}

function updateCalculatedProperties(req, res) {
    return new Promise(async (resolve, reject) => {
        console.log('function: updateCalculatedProperties')
        try {
            const user = await queryUserInfo({session_id: req.query.session_id}) // query only by session_id

            // @@TODO
            const calculated_heath = parseInt(user.base_health)
            const calculated_mana = parseInt(user.base_mana)

            if (calculated_heath !== parseInt(user.calculated_heath) ||
                calculated_mana !== parseInt(user.calculated_mana)) {
                await queryDataBase("UPDATE `pocket`.`users` SET `calculated_health` = '"+calculated_heath+"', `calculated_mana` = '"+calculated_mana+"' WHERE (`character_id` = '"+user.character_id+"');")
            }
            resolve(await queryUserInfo({session_id: req.query.session_id}))
        }
        catch(err) {
            console.log(err)
            reject(err)
        }
    })
}