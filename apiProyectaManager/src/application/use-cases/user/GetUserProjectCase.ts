import { ProjectRepositoryInterface } from "../../../infrastructure/repository/ProjectRepository";

export class GetUserProjectCase {
    constructor(
        private projectRepository: ProjectRepositoryInterface,
    ) { }


    execute = async (pro_id: number) => {
        const data = await this.projectRepository.getUsersProject(pro_id);
        return data;
    }
}