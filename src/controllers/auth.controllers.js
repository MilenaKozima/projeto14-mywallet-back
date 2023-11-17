import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt"
import {userSchema} from "../schemas/auth.schema.js"

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
    try{

    } catch (err){
        res.status(500).send(err.message)
    }
}

export async function signout(req, res) {
    try{

    } catch (err){
        res.status(500).send(err.message)
    }
}