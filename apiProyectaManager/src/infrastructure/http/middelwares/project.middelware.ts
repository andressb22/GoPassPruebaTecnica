import type { Request, Response, NextFunction } from "express";
import { CreateProjectDTO } from "../../../application/DTOS/project/CreateProjectDTO";

export const validateCreateProject = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const proyectDto = new CreateProjectDTO(req.body);
    (req as any).dto = proyectDto;

    next();
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};
