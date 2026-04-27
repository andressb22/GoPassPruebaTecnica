import { ProjectAuthorizationService } from "../../../domain/services/ProjectAuthorization.service";
import { TaskRepositoryInterface } from "../../../infrastructure/repository/TaskRepository";

export class DeleteTaskCase {
  constructor(
    private taskRepository: TaskRepositoryInterface,
    private projectAuth: ProjectAuthorizationService,
  ) {}

  execute = async (tas_id: number, usu_id: number, pro_id: number) => {
    await this.projectAuth.validateUserAccess(pro_id, usu_id);
    const task = await this.taskRepository.findById(tas_id);

    if (!task) throw new Error("Tarea ya eliminada");

    await this.taskRepository.delete(tas_id);
  };
}
