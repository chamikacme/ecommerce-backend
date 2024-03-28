import express from "express";
import {
  createProductController,
  getProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
  getMyProductsController,
} from "./controller";
import { auth } from "../middleware/authMiddleware";
import { validateProductOwner } from "../middleware/validateProductOwner";

const productRoutes = express.Router();

productRoutes.post("/", auth, createProductController);

productRoutes.get("/", getProductsController);

productRoutes.get("/my-products", auth, getMyProductsController);

productRoutes.get("/:id", getProductController);

productRoutes.put("/:id", auth, validateProductOwner, updateProductController);

productRoutes.delete(
  "/:id",
  auth,
  validateProductOwner,
  deleteProductController
);

export default productRoutes;
