import { prisma } from "../http/database/prisma/client";


export interface PriorityRepositoryInterface {
  get(): Promise<any>;
  findById(stt_id: number): Promise<any>;
}

export class PriorityRepository implements PriorityRepositoryInterface {
  get = async () => {
    return await prisma.prt_priority_task.findMany();
  }

  findById = async (prt_id: number) => {
    return await prisma.prt_priority_task.findUnique({
      where: {
        prt_id,
      },
    });
  };
}
