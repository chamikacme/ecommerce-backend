import express from "express";
import authRoutes from "../auth/routes";
import productRoutes from "../products/routes";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/products", productRoutes);

export default router;
