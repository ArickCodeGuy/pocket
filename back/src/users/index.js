const hash = require('./../hash.js')
const queryDataBase = require('./../queryDatabase.js')
const {
    queryUserStatus,
    queryUserInfo,
    queryUserEssentials,
    createSession,
    queryRoute,
    insertUser,
    insertCharacter,
    updateCalculatedProperties
} = require('./../functions.js')

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
        try {
            if (!req.query.login || !req.query.password) {throw {status: 400, text: 'Provide login and password'}}

            const hashPas = hash(`${req.query.login}${req.query.password}`)
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
        try {
            if (!req.query.location_id) {throw {status: 400, text: 'specify location to get list of users'}}
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
            if (!req.query.location_id) {throw {status: 400, text: 'specify location_id to go to'}}
            const destination = req.query.location_id
            const { id: user_id } = await queryUserStatus(req.cookies.session_id)
            const { location_id: character_location, character_id } = await queryUserInfo({session_id: req.cookies.session_id})
            const { route_time } = await queryRoute(character_location, destination)

            // @TODO delay implementation
            // const { queryResult } = await queryDataBase("UPDATE `pocket`.`users` SET `location_id` = '"+destination+"' WHERE (`character_id` = '"+character_id+"');")
            const move_end = new Date().getTime() + route_time * 1000
            const { queryResult } = await queryDataBase("UPDATE `pocket`.`users` SET `move_end` = '"+move_end+"', `move_direction` = '"+destination+"' WHERE (`character_id` = '"+character_id+"');")

            res.send({
                // location_id: req.query.location_id,
                time: route_time,
            })
        }
        catch(err) {
            console.log(err)
            res.status(err.status).send(err.text)
        }
    },
    async cancelGoToLocation(req, res) {
        console.log('REQUEST: cancelGoToLocation')
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