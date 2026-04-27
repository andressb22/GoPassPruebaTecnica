import { ProjectAuthorizationService } from "../../../domain/services/ProjectAuthorization.service";
import { PriorityRepositoryInterface } from "../../../infrastructure/repository/PriorityRepositort";
import { ProjectRepositoryInterface } from "../../../infrastructure/repository/ProjectRepository";
import { StatusRepositoryInterface } from "../../../infrastructure/repository/StatusRepository";
import { TaskRepositoryInterface } from "../../../infrastructure/repository/TaskRepository";
import { TaskType } from "../../DTOS/task/task.type";

export class UpdateTaskCase {
  constructor(
    private taskRepository: TaskRepositoryInterface,
    private statusRepository: StatusRepositoryInterface,
    private priorityRepository: PriorityRepositoryInterface,
    private projectRepository: ProjectRepositoryInterface,
    private projectAuth: ProjectAuthorizationService,
  ) {}

  execute = async (tas_id: number, task: TaskType, usu_id: number) => {
    const pro_id = await this.projectRepository.findById(task.pro_id);
    const status = await this.statusRepository.findById(task.status);
    const priority = await this.priorityRepository.findById(task.priority);

    if (!status) throw new Error("Estado de la tarea invalido");
    if (!priority) throw new Error("Prioridad de la tarea invalida");

    await this.projectAuth.validateUserAccess(pro_id.pro_id, usu_id);

    return await this.taskRepository.update(tas_id, {
      tas_title: task.title,
      tas_description: task.desciption,
      stt_id: task.status,
      prt_id: task.priority,
      tas_updated_at: new Date(),
      pro_id: task.pro_id,
    });
  };
}
