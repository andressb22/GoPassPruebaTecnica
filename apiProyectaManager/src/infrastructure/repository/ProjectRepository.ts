import { mebersType } from "../../application/DTOS/project/project.type";
import { ProjectPersistence } from "../../domain/repositories/types/project.repository";
import { prisma } from "../http/database/prisma/client";

export interface ProjectRepositoryInterface {
  create(project: ProjectPersistence): Promise<any>;
  addMembersToProject(members: mebersType[], pro_id: number): Promise<any>;
  findById(pro_id: number): Promise<any>;
  findMember(pro_id: number, usu_id: number): Promise<any>;
  get(usu_id: number, filter: "ALL" | "CREATED" | "ASSIGNED"): Promise<any>;
  delete(pro_id: number): Promise<void>;
  getUsersProject(pro_id: number): Promise<any>;
}

export class ProjectRepository implements ProjectRepositoryInterface {
  findById = async (pro_id: number) => {
    return await prisma.pro_projects.findUnique({ where: { pro_id } });
  };

  get = async (
    usu_id: number,
    filter: "ALL" | "CREATED" | "ASSIGNED" = "ALL",
  ) => {
    let whereCondition = {};

    if (filter === "CREATED") {
      whereCondition = {
        usu_id_created: usu_id,
      };
    }

    if (filter === "ASSIGNED") {
      whereCondition = {
        prmProjectMembers: {
          some: {
            usu_id: usu_id,
          },
        },
      };
    }

    if (filter === "ALL") {
      whereCondition = {
        OR: [
          { usu_id_created: usu_id },
          {
            prmProjectMembers: {
              some: {
                usu_id: usu_id,
              },
            },
          },
        ],
      };
    }

    return await prisma.pro_projects.findMany({
      where: whereCondition,
      include: {
        _count: {
          select: {
            tasTasks: true, // total tareas
          },
        },
        tasTasks: {
          where: {
            stt: {
              stt_name: "DONE",
            },
          },
          select: {
            tas_id: true,
          },
        },
      },
    });
  };

  getUsersProject = async (pro_id: number) => {
    return await prisma.prm_project_members.findMany({
      where: {
        pro_id: Number(pro_id),
      },
      include: {
        usu: true,
      },
    });
  };

  create = async (project: ProjectPersistence) => {
    return await prisma.pro_projects.create({ data: project });
  };

  addMembersToProject = async (members: mebersType[], pro_id: number) => {
    await prisma.prm_project_members.createMany({
      data: members.map((member) => ({
        pro_id,
        usu_id: member.usu_id,
        rol_id: member.rol_id,
      })),
      skipDuplicates: true, // 🔥 evita duplicados
    });
  };

  findMember = async (pro_id: number, usu_id: number) => {
    return prisma.prm_project_members.findFirst({
      where: {
        pro_id,
        usu_id,
      },
      include: {
        rol: true,
      },
    });
  };

  delete = async (pro_id: number) => {
    await prisma.prm_project_members.deleteMany({
      where: {
        pro_id,
      },
    });

    await prisma.pro_projects.delete({
      where: {
        pro_id,
      },
    });
  };
}
