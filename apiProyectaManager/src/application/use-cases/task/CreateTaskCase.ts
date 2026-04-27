import { ProjectAuthorizationService } from "../../../domain/services/ProjectAuthorization.service";
import { PriorityRepositoryInterface } from "../../../infrastructure/repository/PriorityRepositort";
import { ProjectRepositoryInterface } from "../../../infrastructure/repository/ProjectRepository";
import { StatusRepositoryInterface } from "../../../infrastructure/repository/StatusRepository";
import { TaskRepositoryInterface } from "../../../infrastructure/repository/TaskRepository";
import { TaskType } from "../../DTOS/task/task.type";

export class CreateTaskCase {
  constructor(
    private taskRepository: TaskRepositoryInterface,
    private statusRepository: StatusRepositoryInterface,
    private priorityRepository: PriorityRepositoryInterface,
    private projectRepository: ProjectRepositoryInterface,
    private projectAuth: ProjectAuthorizationService,
  ) { }

  execute = async (task: TaskType, usu_id: number) => {
    const pro_id = await this.projectRepository.findById(task.pro_id);
    const status = await this.statusRepository.findById(task.status);
    const priority = await this.priorityRepository.findById(task.priority);

    if (!pro_id) throw new Error("El proyecto no existe");
    if (!status) throw new Error("Estado de la tarea invalido");
    if (!priority) throw new Error("Prioridad de la tarea invalida");

    await this.projectAuth.validateUserAccess(pro_id.pro_id, usu_id);

    return await this.taskRepository.create({
      tas_title: task.title,
      tas_description: task.desciption,
      stt_id: task.status,
      prt_id: task.priority,
      tas_updated_at: new Date(),
      pro_id: task.pro_id,
    });
  };
}
