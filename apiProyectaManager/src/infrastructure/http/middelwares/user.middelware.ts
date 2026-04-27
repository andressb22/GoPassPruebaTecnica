import type { Request, Response, NextFunction } from "express";
import { CreateUserDTO } from "../../../application/DTOS/user/CreateUserDTO";
import { LoginUserDTO } from "../../../application/DTOS/user/LoginUserDTO";

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userDto = new CreateUserDTO(req.body);
    (req as any).dto = userDto;

    next();
  } catch (error: any) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

export const validateLoginUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userDto = new LoginUserDTO(req.body);
    (req as any).dto = userDto;

    next();
  } catch (error: any) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
