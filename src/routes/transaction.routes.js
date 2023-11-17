import { Router } from "express";

const transactionRouter = Router()

transactionRouter.get("/transaction")
transactionRouter.post("/transaction")

export default transactionRouter 