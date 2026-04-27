import type { Request, Response, NextFunction } from "express";
import { CreateTaskDTO } from "../../../application/DTOS/task/CreateTaskDTO";
import { UpdateStatusTaskDTO } from "../../../application/DTOS/task/UpdateStatusTaskDTO";
import { TaskProIdDTO } from "../../../application/DTOS/task/TaskProIdDTO";

export const validateCreateTask = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const taskDto = new CreateTaskDTO(req.body);
    (req as any).dto = taskDto;

    next();
  } catch (error: any) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

export const validateUpdateStatusTask = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const taskDto = new UpdateStatusTaskDTO(req.body);
    (req as any).dto = taskDto;

    next();
  } catch (error: any) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

export const validateTaskProId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const taskDto = new TaskProIdDTO(req.body);
    (req as any).dto = taskDto;

    next();
  } catch (error: any) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
