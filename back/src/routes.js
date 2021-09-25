const express = require('express')
const router = express.Router()
const { getUserData, register, login, delUser, usersList, goToLocation, getStatus} = require('./users/index.js')
const { getLocation, getNeighbours } = require('./locations/index.js')

// 
// USERS
// 

// get user's info by id or name in query
// /users/?id=123
// {
//     login,
//     lvl,
//     profile_picture,
//     class_id,
//     base_strength,
//     base_stamina,
//     base_agility,
//     inventory_head,
//     inventory_boots,
//     inventory_left_hand,
//     inventory_right_hand,
//     inventory_neck
// }
router.get('/users/', getUserData)

// register user by name and password
// POST method
// /users/?name=foo&password=bar
router.post('/users/', register)

// login by specifying name and password
// /users/?name=foo&password=bar
router.get('/users/login', login)

// delete user by id or name
// wip
router.delete('/users/', delUser)

// returns array of users given location_id
// [
//     {
//         name,
//         lvl,
//         profile_picture
//     }
// ]
// max array.length = 10
// /users/list/?location_id=1
router.get('/users/list/', usersList)

// returns given location_id and session_id
// {
//     route_time
// }
// sesion_id is stored in cookies and should be provided
// /users/go/?location_id=1
router.get('/users/go/', goToLocation)

// returns given session_id
// {
//     loged: true || false
// }
// 0 - no session_id, session_id is expired, not found, mysql error
// 1 session_id is correct
router.get('/users/get_status/', getStatus)

// 
// LOCATIONS
// 

// returns given location_id
// {
//     name,
//     description
// }
// /location/?location_id=1
router.get('/location/', getLocation)

module.exports = router