import { ProjectRepositoryInterface } from "../../../infrastructure/repository/ProjectRepository";

export class GetProjectCase {
  constructor(private proyectRepository: ProjectRepositoryInterface) {}

  execute = async (usu_id: number, filter: "ALL" | "CREATED" | "ASSIGNED") => {
    return await this.proyectRepository.get(usu_id, filter);
  };
}
