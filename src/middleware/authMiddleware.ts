import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../security/service";
import User from "../auth/models/User";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (
    !(
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
  ) {
    res.status(401).json({ message: "Unauthorized, No bearer token!" });
    return;
  }

  try {
    token = req.headers.authorization.split(" ")[1];
    const id = await verifyToken(token);
    const user = await User.findById(id);
    user.password = undefined;
    req.body.user = user;
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  next();
};
