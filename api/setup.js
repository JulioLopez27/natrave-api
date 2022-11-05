// setup del servidor
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'


import {router} from './router.js'

export const app = new Koa()

// config cors problems
app.use(cors())
// config body req
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

