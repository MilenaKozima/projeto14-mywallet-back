import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"


export async function signup(req, res) {
    const {name, email, password} = req.body

    try{
        const user = await db.collection("users").findOne({email})
        if (user) return res.status(409).send({message: "E-mail já cadastrado"})
        
        const hash = bcrypt.hashSync(password, 10)

        await db.collection("users").insertOne({name, email, password: hash})
        res.sendStatus(201)
    } catch (err){
        res.status(500).send(err.message)
    }
}

export async function signin(req, res) {
    const {email, password} = req.body

    try{
        const user = await db.collection("users").findOne({email})
        if (!user) return res.status(404).send({message: "E-mail não cadastrado"})

        const iscorrectPassword = bcrypt.compareSync(password, user.password)
        if (!iscorrectPassword) return res.status(401).send({message: "Senha incorreta"})

        const token = uuid()
        await db.collection("sessions").insertOne({token, userId: user. id})

        res.send({token, userName: user.name})
    } catch (err){
        res.status(500).send(err.message)
    }
}

export async function signout(req, res) {
    const {token} = res.locals
    try{
        await db.collection("session").deleteOne({token})
        res.sendStatus(204)

    } catch (err){
        res.status(500).send(err.message)
    }
}