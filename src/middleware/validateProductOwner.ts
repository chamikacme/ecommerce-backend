import { NextFunction, Request, Response } from "express";
import Product from "../products/model/Product";
import validateMongoDBId from "../utils/validateMongoDBId";
import { HttpError } from "routing-controllers";

export const validateProductOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = req.params.id;

  if (!validateMongoDBId(productId)) {
    throw new HttpError(404, "Product not found");
  }

  const userId = req.body.user._id;

  try {
    const product = await Product.findById(productId);
    if (!product || product.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Unauthorized: You can only modify your own products",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
