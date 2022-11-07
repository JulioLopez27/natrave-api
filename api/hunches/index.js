import { PrismaClient } from "@prisma/client"
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient()

export const create = async ctx => {

    if (!ctx.headers.authorization) {
        ctx.status = 401
        return
    }

    try {

        const [type, token] = ctx.headers.authorization.split(" ")
        const data = jwt.verify(token, process.env.JWT_SECRET)

        const userId = data.sub
        const { gameId } = ctx.request.body
       
        let homeTeamScore = parseInt(ctx.request.body.homeTeamScore)
        let awayTeamScore = parseInt(ctx.request.body.awayTeamScore)

        if (!homeTeamScore) {
            homeTeamScore = 0
        } else if (!awayTeamScore) {
            awayTeamScore = 0
        }

        try {
            const [hunch] = await prisma.hunch.findMany({
                where: { userId, gameId },
            })
            ctx.body = hunch
                ? await prisma.hunch.update({
                    where: {
                        id: hunch.id
                    },
                    data: { homeTeamScore, awayTeamScore }
                })
                : await prisma.hunch.create({
                    data: {
                        userId, gameId, homeTeamScore, awayTeamScore
                    }
                })



        } catch (error) {
            console.log(error)
            ctx.body = error
            ctx.status = 500
        }
    } catch (error) {
        ctx.status = 406
        return
    }
}



