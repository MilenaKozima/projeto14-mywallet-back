import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { MongoClient } from "mongodb";
import Joi from "joi";
import router from "./routes/index.routes.js";

const app = express();

//configurações
app.use(cors());
app.use(express.json());
app.use(router);
dotenv.config();

//conexão com o banco de dados
const mongoClient = new MongoClient(process.env.DATABASE_URL)
try{
    await mongoClient.connect()
    console.log("MongoDB connected")
} catch (err){
    console.log(err.message)
}

const db = mongoClient.db();


//Schemas
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
})

const transSchema = Joi.object({
    value: Joi.number().positive().required(),
    description: Joi.string().required(),
    type: Joi.string().required.valid("income","expense")
})

//rotas
app.get("/teste", (request, response) => {
    response.send("Funcionou");
})

//Escutando a espera da requisição
const PORT = 5000;
app.listen(PORT,() => console.log(`Server running in the port ${PORT}`));


