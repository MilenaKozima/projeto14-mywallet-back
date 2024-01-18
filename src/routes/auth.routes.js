import { Router } from "express";
import { signin, signout, signup } from "../controllers/auth.controllers.js";
import { loginSchema, userSchema } from "../schemas/auth.schema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const authRouter = Router()

authRouter.post("/cadastro", validateSchema(userSchema), signup)
authRouter.post("/login", validateSchema(loginSchema), signin)
authRouter.post("/logout",validateAuth, signout)

export default authRouter

