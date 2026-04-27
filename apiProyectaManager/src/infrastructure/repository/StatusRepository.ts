import { prisma } from "../http/database/prisma/client";

export interface StatusRepositoryInterface {
  findById(stt_id: number): Promise<any>;
}

export class StatusRepository implements StatusRepositoryInterface  {
  findById = async (stt_id: number) => {
    return await prisma.stt_status_task.findUnique({
      where: {
        stt_id,
      },
    });
  };
}
