const queryDataBase = require('./queryDatabase.js')
const hash = require('./hash.js')

// function to query user status by session id
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
        catch(err) {reject(err)}
    })
}

// query character info by name, id or session_id
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
        catch(err) {reject(err)}
    })
}

// used in logging in
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
        catch(err) {reject(err)}
    })
}

// used in logging in
function createSession(user_id) {
    return new Promise(async (resolve, reject) => {
        console.log('function: createSession')
        try {
            if (!user_id) {throw {status: 400, text: 'no user_id provided'}}
            const session_id = hash()
            const time = Date.now()
            // 604800000 -> 7 days
            const time_expires = time + 604800000
            const result = await queryDataBase("INSERT INTO `pocket`.`sessions` (`user_id`, `session_id`, `time_created`, `time_expires`) VALUES ('"+user_id+"', '"+session_id+"', '"+time+"', '"+time_expires+"');")
            resolve({
                session_id: session_id,
            })
        }
        catch(err) {reject(err)}
    })
}

// 
function queryRoute(location_from, location_to) {
    return new Promise(async (resolve, reject) => {
        console.log('function: queryRoute')
        try {
            if (!location_from) {throw {status: 400, text: 'no location_from provided'}}
            if (!location_to) {throw {status: 400, text: 'no location_to provided'}}
            const result = await queryDataBase(`SELECT route_time, id_to, route_name FROM pocket.location_routes WHERE id_from = ${location_from} AND id_to = ${location_to} LIMIT 1;`)
            if (!result.length) {throw {status: 404, text: `Can not find route between ${location_from} and ${location_to}`}}
            resolve(result[0])
        }
        catch(err) {reject(err)}
    })
}

function insertUser(login, password) {
    // @@TODO
}

function insertCharacter(user_id, name) {
    return new Promise(async (resolve, reject) => {
        console.log('function: insertCharacter')
        try {
            if (!user_id) {throw {status: 400, text: 'no user_id provided'}}
            if (!name) {throw {status: 400, text: 'no name provided'}}
            const insertResult = await queryDataBase("INSERT INTO `pocket`.`users` (`user_id`, `name`) VALUES ('"+user_id+"', '"+name+"');")
            await queryDataBase("UPDATE `pocket`.`users_essentials` SET `active_character_id` = '"+insertResult[0].insertId+"' WHERE (`id` = '"+user_id+"');")
            resolve('Success')
        }
        catch(err) {reject(err)}
    })
}

function updateCalculatedProperties(session_id) {
    return new Promise(async (resolve, reject) => {
        console.log('function: updateCalculatedProperties')
        try {
            const user = await queryUserInfo({session_id: session_id}) // query only by session_id

            // @@TODO
            const calculated_heath = parseInt(user.base_health)
            const calculated_mana = parseInt(user.base_mana)

            if (calculated_heath !== parseInt(user.calculated_heath) ||
                calculated_mana !== parseInt(user.calculated_mana)) {
                await queryDataBase("UPDATE `pocket`.`users` SET `calculated_health` = '"+calculated_heath+"', `calculated_mana` = '"+calculated_mana+"' WHERE (`character_id` = '"+user.character_id+"');")
            }
            resolve(await queryUserInfo({session_id: session_id}))
        }
        catch(err) {reject(err)}
    })
}

module.exports = {
    queryUserStatus,
    queryUserInfo,
    queryUserEssentials,
    createSession,
    queryRoute,
    insertUser,
    insertCharacter,
    updateCalculatedProperties
}