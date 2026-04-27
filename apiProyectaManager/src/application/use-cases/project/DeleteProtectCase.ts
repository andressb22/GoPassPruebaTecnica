import { ProjectRepositoryInterface } from "../../../infrastructure/repository/ProjectRepository";


export class DeleteProtectCase {
    constructor(
        private projectRepository: ProjectRepositoryInterface,
    ) { }

    execute = async (pro_id: number, usu_id: number) => {
        const project = await this.projectRepository.findById(pro_id);

        if (!project) {
            throw new Error("El proyecto no existe");
        }

        const permisos = await this.projectRepository.findMember(pro_id, usu_id);

        if (permisos.rol.rol_name !== "ADMIN") {
            throw new Error("No tienes permisos para eliminar este proyecto");
        }

        return await this.projectRepository.delete(pro_id);
    };
}