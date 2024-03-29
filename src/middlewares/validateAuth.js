import { db } from "../database/database.connection.js"

export async function validateAuth (req, res, next){
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")

    if (!token) return res.status(404).send("Necessario um token")

    try{
        const session = await db.collection("sessions").findOne({token})
        if (!session) return res.status(404).send("Token invalido")
        
        res.locals.token = token
        res.locals.userId = session.userId

        next()
    } catch (err){
        res.status(500).send(err.message)
    }
}