import { Router } from "express";
import { createTransaction, readTransactions } from "../controllers/transaction.controllers.js";
import { validateAuth } from "../middlewares/validateAuth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { transactionSchema } from "../schemas/transaction.schema.js";

const transactionRouter = Router()

transactionRouter.get("/transaction", validateAuth, readTransactions)
transactionRouter.post("/transaction", validateAuth, validateSchema(transactionSchema), createTransaction)

export default transactionRouter 