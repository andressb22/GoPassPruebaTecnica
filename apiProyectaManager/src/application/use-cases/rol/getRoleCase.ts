import { RolRepositortInterface } from "../../../infrastructure/repository/RolRepository";

export class GetRolCase {
  constructor(private RolRepository: RolRepositortInterface) {}

  execute = async () => {
    return await this.RolRepository.get();
  };
}
