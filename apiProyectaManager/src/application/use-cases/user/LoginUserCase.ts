import { HashService } from "../../../domain/services/Hash.service";
import { TokenService } from "../../../domain/services/Token.service";
import { Email } from "../../../domain/value-objects/email";
import { UserRepositoryInterface } from "../../../infrastructure/repository/UserRepository";
import { loginUserType } from "../../DTOS/user/user.type";

export class LoginUserCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private hashPasswordService: HashService,
    private tokenService: TokenService,
  ) {}

  execute = async (user: loginUserType) => {
    const email = new Email(user.email);
    const userData = await this.userRepository.findByEmail(user.email);

    if (!userData) {
      const error = new Error("Usuario o contraseña incorrectos") as any;
      error.status = 401;
      throw error;
    }

    const passwordHash = await this.hashPasswordService.compare(
      user.password,
      userData.usu_password,
    );

    if (!passwordHash) {
      const error = new Error("Usuario o contraseña incorrectos") as any;
      error.status = 401;
      throw error;
    }

    const token = await this.tokenService.generate({
      userId: userData.usu_id,
      email: userData.usu_email,
    });

    return { token, usu_name: userData.usu_name };
  };
}
