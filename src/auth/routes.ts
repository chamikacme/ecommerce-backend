import express from "express";
import { auth } from "../middleware/authMiddleware";
import { register, login, validateToken } from "./controller";

const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get("/profile", auth, validateToken);

export default authRouter;
