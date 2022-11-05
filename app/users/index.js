import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const signup = async (ctx) => {
    // password encryptation
    const email = ctx.request.body.email
    const user = await prisma.user.findUnique({
        where: { email }
    })
    if (user) {
        ctx.status = 302
        return
    }
    const password = await bcrypt.hash(ctx.request.body.password, 10)
    const data = {
        name: ctx.request.body.name,
        username: ctx.request.body.username,
        email,
        password,
    }
    try {
        // remove pass from data 
        const { password, ...user } = await prisma.user.create({ data })

        const accessToken = jwt.sign({
            sub: user.id,
            name: user.name,
            expiresIn: '1d',
        }, process.env.JWT_SECRET)

        ctx.body = { user, accessToken }
        ctx.status = 201
        console.log(ctx.body);

    } catch (error) {
        ctx.body = error
        ctx.status = 500
    }
}

export const login = async ctx => {
    const [type, token] = ctx.headers.authorization.split(" ")
    // decoded token
    const [email, plainTextPassword] = Buffer.from(token, 'base64').toString().split(":")
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        ctx.status = 404
        return
    }
    const passwordMatch = await bcrypt.compare(plainTextPassword, user.password)

    if (!passwordMatch) {
        ctx.status = 404
        return
    }

    const { password, ...result } = user

    const accessToken = jwt.sign({
        sub: user.id,
        name: user.name,
        expiresIn: "1d"
    }, process.env.JWT_SECRET)

    ctx.body = { user: result, accessToken }
}

export const hunches = async ctx => {
    const username = ctx.request.params.username
    const user = await prisma.user.findUnique({
        where: { username }
    })
    if (!user) {
        ctx.status = 404
        return
    }
    const hunches = await prisma.hunch.findMany({
        where: { userId: user.id }
    })
    ctx.body = {name:user.name,hunches}
}

