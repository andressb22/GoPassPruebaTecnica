import { UserPersistence } from "../../domain/repositories/types/user.repository";
import { prisma } from "../http/database/prisma/client";

export interface UserRepositoryInterface {
  create(user: UserPersistence): Promise<any>;
  findById(usu_id: number): Promise<any>;
  findByIds(UsersIds: number[]): Promise<any>;
  findByEmail(usu_email: string): Promise<any>;
  get(): Promise<any>;
}

export class UserRepository implements UserRepositoryInterface {
  get = async () => {
    return await prisma.usu_usuario.findMany();
  };

  create = async (user: UserPersistence) => {
    return await prisma.usu_usuario.create({ data: user });
  };

  findByEmail = async (usu_email: string) => {
    return await prisma.usu_usuario.findUnique({
      where: {
        usu_email,
      },
    });
  };

  findById = async (usu_id: number) => {
    return await prisma.usu_usuario.findUnique({
      where: {
        usu_id,
      },
    });
  };

  findByIds = async (UsersIds: number[]) => {
    return await prisma.usu_usuario.findMany({
      where: {
        usu_id: {
          in: UsersIds,
        },
      },
    });
  };
}
