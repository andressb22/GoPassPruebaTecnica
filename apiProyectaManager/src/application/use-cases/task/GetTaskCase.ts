import { ProjectRepositoryInterface } from "../../../infrastructure/repository/ProjectRepository";
import { TaskRepositoryInterface } from "../../../infrastructure/repository/TaskRepository";

export class GetTaskCase {
  constructor(
    private taskRepository: TaskRepositoryInterface,
    private projectRepository: ProjectRepositoryInterface,
  ) {}

  execute = async (usu_id: number, pro_id: number) => {
    const member = await this.projectRepository.findMember(pro_id, usu_id);

    if (!member) {
      throw new Error("No perteneces al proyecto");
    }

    return await this.taskRepository.get(pro_id);
  };
}
