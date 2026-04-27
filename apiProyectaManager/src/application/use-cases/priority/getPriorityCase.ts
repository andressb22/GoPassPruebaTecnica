import { PriorityRepositoryInterface } from "../../../infrastructure/repository/PriorityRepositort";


export class GetPrioritiesCase {
    constructor(private priorityRepository: PriorityRepositoryInterface) { }

    execute = async () => {
        return await this.priorityRepository.get();
    }
}