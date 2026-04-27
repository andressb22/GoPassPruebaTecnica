import { TaskPersistence } from "../../domain/repositories/types/task.repository";
import { prisma } from "../http/database/prisma/client";

export interface TaskRepositoryInterface {
  get(pro_id: number): Promise<any>;
  create(user: TaskPersistence): Promise<any>;
  updateStatus(tas_id: number, stt_id: number): Promise<any>;
  findById(tas_id: number): Promise<any>;
  update(tas_id: number, task: TaskPersistence): Promise<any>;
  delete(tas_id: number): Promise<any>;
}

export class TaskRepository implements TaskRepositoryInterface {
  get = async (pro_id: number) => {
    return await prisma.tas_task.findMany({
      where: { pro_id },
      select: {
        tas_id: true,
        tas_title: true,
        tas_description: true,
        prt_id: true,
        stt_id: true,
        tas_created_at: true,
        prt: {
          select: {
            prt_name: true,
          },
        },

        stt: {
          select: {
            stt_name: true,
          },
        },
      },
    });
  };

  findById = async (tas_id: number) => {
    return await prisma.tas_task.findUnique({ where: { tas_id } });
  };

  create = async (task: TaskPersistence) => {
    return await prisma.tas_task.create({
      data: task,
      select: {
        tas_id: true,
        tas_title: true,
        tas_description: true,
        stt_id: true,
        prt_id: true,

        stt: {
          select: {
            stt_name: true,
          },
        },

        prt: {
          select: {
            prt_name: true,
          },
        },
      },
    });
  };

  update = async (tas_id: number, task: TaskPersistence) => {
    return await prisma.tas_task.update({
      where: { tas_id },
      data: task,
      select: {
        tas_created_at: true,
        tas_id: true,
        tas_title: true,
        tas_description: true,
        stt_id: true,
        prt_id: true,

        stt: {
          select: {
            stt_name: true,
          },
        },

        prt: {
          select: {
            prt_name: true,
          },
        },
      },
    });
  };

  updateStatus = async (tas_id: number, stt_id: number) => {
    return await prisma.tas_task.update({
      where: {
        tas_id,
      },
      data: {
        stt_id,
      },
    });
  };

  delete = async (tas_id: number) => {
    return await prisma.tas_task.delete({ where: { tas_id } });
  };
}
