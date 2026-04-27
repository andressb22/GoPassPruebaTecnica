import { ProjectAuthorizationService } from "../../../domain/services/ProjectAuthorization.service";
import { StatusRepositoryInterface } from "../../../infrastructure/repository/StatusRepository";
import { TaskRepositoryInterface } from "../../../infrastructure/repository/TaskRepository";

export class UpdateStatusTaskCase {
  constructor(
    private statusRepository: StatusRepositoryInterface,
    private taskRepository: TaskRepositoryInterface,
    private projectAuth: ProjectAuthorizationService,
  ) {}

  execute = async (
    tas_id: number,
    status: number,
    usu_id: number,
    pro_id: number,
  ) => {
    const task = await this.taskRepository.findById(tas_id);

    if (!task) throw new Error("La tarea no existe");
    if (!status) throw new Error("el campo status es requerido");

    const statusData = await this.statusRepository.findById(tas_id);

    if (!statusData) throw new Error("Estado de la tarea invalido");

    await this.projectAuth.validateUserAccess(pro_id, usu_id);

    return await this.taskRepository.updateStatus(tas_id, status);
  };
}
