import { Router } from "express";
import cadastro from "./cadastro.routes.js";

const router = Router();

router.use(cadastro);

export default router;