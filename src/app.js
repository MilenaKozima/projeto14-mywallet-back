import express from "express"
import cors from "cors"
import dotenv from "dotenv"

const app = express();

//configurações
app.use(cors());
app.use(express.json());
dotenv.config();

//rotas
app.get("/teste", (request, response) => {
    response.send("Funcionou");
})

//Escutando a espera da requisição
const PORT = 5000;
app.listen(PORT,() => console.log(`Server running in the port ${PORT}`));
