import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.routes.js";
import transactionRouter from "./routes/transaction.routes.js";

const app = express();

//configurações
app.use(cors());
app.use(express.json());
app.use(authRouter)
app.use(transactionRouter)

//Escutando a espera da requisição
const PORT = 5000;
app.listen(PORT,() => console.log(`Server running in the port ${PORT}`));


