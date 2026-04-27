import type { Request, Response, NextFunction } from "express";
import { JwtService } from "../../services/jwt.service";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const jwtService = new JwtService();
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token requerido" });
  }

  const token = authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ message: "Token no enviado" });

  try {
    const decoded = jwtService.decode(token);
    console.log("decoded",decoded)
    req.user = {
      userId: decoded?.userId,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
