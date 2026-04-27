import { RolRepositortInterface } from "../../../infrastructure/repository/RolRepository";


export class GetStatesCase {
    constructor(private rolRepository: RolRepositortInterface) { }

    execute = async () => {
        return await this.rolRepository.getStates();
    }
}