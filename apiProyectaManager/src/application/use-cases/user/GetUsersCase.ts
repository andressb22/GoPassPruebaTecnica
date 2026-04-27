import { UserRepositoryInterface } from "../../../infrastructure/repository/UserRepository";

export class GetUsersCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  execute = async () => {
    return await this.userRepository.get();
  };
}
