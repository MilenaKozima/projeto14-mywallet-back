import dayjs from "dayjs"
import {db} from "../database/database.connection.js"

export async function createTransaction(req, res) {
    const {value, description, type} = req.body
    const {userId} = res.locals
    try {
        const transaction = {value:Number(value), description, type, date:dayjs().valueOf(), userId}
        await db.collection("transactions").insertOne(transaction)
        res.sendStatus(201)
    } catch (err){
        res.status(500).send(err.message)
    }
}

export async function readTransactions(req, res) {

    try {
        res.send("post")
    } catch (err){
        res.status(500).send(err.message)
    }
}