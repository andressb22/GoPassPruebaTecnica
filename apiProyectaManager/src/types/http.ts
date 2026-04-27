import { Request } from "express";

export interface RequestWithDTO<T> extends Request {
  dto: T;
}