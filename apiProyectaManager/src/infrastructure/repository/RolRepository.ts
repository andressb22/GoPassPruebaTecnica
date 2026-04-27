import { prisma } from "../http/database/prisma/client";

export interface RolRepositortInterface {
  get(): Promise<any>;
  getStates(): Promise<any>;
}

export class RolRepository implements RolRepositortInterface {
  get = async () => {
    return await prisma.rol_rol.findMany();
  };
  getStates = async () => {
    return await prisma.stt_status_task.findMany();
  }
}
