import { ProjectRepositoryInterface } from "../../../infrastructure/repository/ProjectRepository";
import { UserRepositoryInterface } from "../../../infrastructure/repository/UserRepository";
import { ProjectType } from "../../DTOS/project/project.type";

export class CreateProjectCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private proyectRepository: ProjectRepositoryInterface,
  ) { }

  execute = async (project: ProjectType) => {
    const { usu_id_created, projectMembers, name, description } = project;
    const user = await this.userRepository.findById(usu_id_created);

    if (!user) {
      throw new Error("El usuario creador del proyecto no existe");
    }

    const idMembers = projectMembers.map((member) => member.usu_id);

    const users = await this.userRepository.findByIds(idMembers);

    if (users.length !== projectMembers.length) {
      throw new Error("Uno o más usuarios asignados no existen");
    }

    const projectData = await this.proyectRepository.create({
      usu_id_created,
      pro_name: name,
      pro_description: description,
      pro_updated_at: new Date(),
    });



    await this.proyectRepository.addMembersToProject(
      projectMembers,
      projectData.pro_id,
    );

    return {
      pro_id: projectData.pro_id,
      pro_name: projectData.pro_name,
      pro_description: projectData.pro_description,
      usu_id_created: projectData.usu_id_created,
      pro_updated_at: projectData.pro_updated_at,
      _count: {
        tasTasks: 0,
      },
      tasTasks: [],
    };
  };
}
