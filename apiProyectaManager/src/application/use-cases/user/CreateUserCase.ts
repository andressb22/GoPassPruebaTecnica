import { HashService } from "../../../domain/services/Hash.service";
import { TokenService } from "../../../domain/services/Token.service";
import { Email } from "../../../domain/value-objects/email";
import { Password } from "../../../domain/value-objects/password";
import { UserRepositoryInterface } from "../../../infrastructure/repository/UserRepository";
import { userType } from "../../DTOS/user/user.type";

export class CreateUserCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private hashPasswordService: HashService,
    private tokenService: TokenService,
  ) {}

  async execute(user: userType) {
    const email = new Email(user.email);
    const password = new Password(user.password);

    const passwordHash = await this.hashPasswordService.hash(password.value);

    const userData = await this.userRepository.create({
      usu_name: user.name,
      usu_email: email.value,
      usu_password: passwordHash,
      usu_updated_at: new Date(),
    });

    console.log("userData", userData);

    const token = await this.tokenService.generate({
      userId: userData.user_id,
      email: userData.usu_email,
    });

    //esto es un registro entonces debe generar un token  y si me da tiempo un refresh token
    //debe cifrar la contraseña y devolverla para guardarla en db
    // debe devolver usuario contraseña y id
    return { token, usu_name: userData.usu_name };
  }
}
