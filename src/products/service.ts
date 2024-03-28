import Product from "./model/Product";
import { HttpError } from "routing-controllers";

export const createProduct = async (
  name: string,
  price: number,
  imageUrl: string,
  userId: number
) => {
  const product = await Product.create({
    name,
    price,
    image: imageUrl,
    userId,
  });

  return product;
};

export const getProducts = async () => {
  const products = await Product.find();

  return products;
};

export const getProduct = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new HttpError(404, "Product not found");
  }

  return product;
};

export const updateProduct = async (
  id: string,
  name: string,
  price: number,
  imageUrl: string
) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { name, price, image: imageUrl },
    { new: true }
  );

  if (!product) {
    throw new HttpError(404, "Product not found");
  }

  return product;
};

export const deleteProduct = async (id: string) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new HttpError(404, "Product not found");
  }

  return product;
};

export const getMyProducts = async (userId: number) => {
  const products = await Product.find({ userId });

  return products;
};
