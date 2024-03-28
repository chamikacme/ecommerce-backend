import User from "./models/User";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../security/service";
import { HttpError } from "routing-controllers";

export const register = async (
  fullName: string,
  password: string,
  mobileNumber: string
) => {
  const userExists = await User.findOne({ mobileNumber });

  if (!userExists) {
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      fullName,
      mobileNumber,
      password: hashedPassword,
    });

    const token = await generateToken(user.id);

    user.password = undefined;

    return {
      user,
      token,
    };
  } else {
    throw new HttpError(400, "User already exists");
  }
};

export const login = async (mobileNumber: string, password: string) => {
  const user = await User.findOne({ mobileNumber });

  if (!user) {
    throw new HttpError(401, "Invalid credentials");
  }

  const isAuthenticated = await comparePassword(password, user.password);

  if (!isAuthenticated) {
    throw new HttpError(401, "Invalid credentials");
  }

  const token = await generateToken(user.id);

  user.password = undefined;

  return {
    user,
    token,
  };
};

export const updateFavorites = async (userId: string, favorites: string[]) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError(404, "User not found");
  }

  user.favorites = favorites;

  await user.save();

  return {
    user,
  };
};
