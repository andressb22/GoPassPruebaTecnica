import { ProjectRepositoryInterface } from "../../infrastructure/repository/ProjectRepository";

export class ProjectAuthorizationService {
  constructor(private projectRepository: ProjectRepositoryInterface) {}

  async validateUserAccess(pro_id: number, userId: number) {
    const member = await this.projectRepository.findMember(pro_id, userId);

    if (!member) {
      throw new Error("No perteneces al proyecto");
    }

    if (!this.canEditTasks(member.rol.rol_name)) {
      throw new Error("No tienes permisos para editar tareas");
    }

    return true;
  }

  canEditTasks(role: string) {
    return ["ADMIN", "EDITOR"].includes(role);
  }
}
