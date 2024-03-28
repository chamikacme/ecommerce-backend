import express from "express";
import * as z from "zod";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "./service";
import validateMongoDBId from "../utils/validateMongoDBId";
import { HttpError } from "routing-controllers";
import cloudinary from "../config/cloudinary";

export const createProductController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const bodySchema = z.object({
      name: z.string().min(3),
      price: z.number().positive({ message: "Price must be positive" }),
      image: z.string().url().optional(),
    });

    const { name, price, image } = bodySchema.parse(req.body);

    const result = await cloudinary.uploader.upload(image, {
      upload_preset: "unsigned_upload",
      allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
    });

    const imageUrl = result.secure_url;

    const userId = req.body.user.id;

    const response = await createProduct(name, price, imageUrl, userId);

    res.status(200).json({
      status: "Success",
      data: response,
    });
  } catch (error) {
    res.status(error.httpCode || 500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

export const getProductsController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const response = await getProducts();

    res.status(200).json({
      status: "Success",
      data: response,
    });
  } catch (error) {
    res.status(error.httpCode || 500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

export const getProductController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    if (!validateMongoDBId(id)) {
      throw new HttpError(404, "Product not found");
    }

    const response = await getProduct(id);

    res.status(200).json({
      status: "Success",
      data: response,
    });
  } catch (error) {
    res.status(error.httpCode || 500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

export const updateProductController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const bodySchema = z.object({
      name: z.string().min(3).optional(),
      price: z.number().min(1).optional(),
      image: z.string().url().optional(),
    });

    const { name, price, image } = bodySchema.parse(req.body);

    const { id } = req.params;

    const result = await cloudinary.uploader.upload(image, {
      upload_preset: "unsigned_upload",
      allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
    });

    const imageUrl = result.secure_url;

    const response = await updateProduct(id, name, price, imageUrl);

    res.status(200).json({
      status: "Success",
      data: response,
    });
  } catch (error) {
    res.status(error.httpCode || 500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

export const deleteProductController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const response = await deleteProduct(id);

    res.status(200).json({
      status: "Success",
      data: response,
    });
  } catch (error) {
    res.status(error.httpCode || 500).json({
      status: "Failed",
      message: error.message,
    });
  }
};
