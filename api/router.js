// config de rutas 
import Router from '@koa/router'

import * as users from './users/index.js'
import * as hunches from './hunches/index.js'
import * as games from './games/index.js';


export const router = new Router()

/*************PATHS**************************************************/
// USERS
router.get('/users',users.getUsers)
router.get('/login', users.login)
router.post('/signup', users.signup)

// GAMES
router.get('/games', games.list)


//HUNCHES 
router.post('/hunches', hunches.create)
router.get('/:username', users.hunches)
