import express from "express";
import { auth } from "../middleware/authMiddleware";
import { register, login, validateToken,updateFavoritesController } from "./controller";

const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get("/profile", auth, validateToken);

authRouter.post("/update-favorites", auth, updateFavoritesController);

export default authRouter;
