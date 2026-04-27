import { loginUserType } from "./user.type";

export class LoginUserDTO {
  email: string;
  password: string;

  constructor(data: loginUserType) {
    if (!data.email) throw new Error("Campo email es requerido");

    if (!data.password) throw new Error("Campo password es requerido");

    this.email = data.email;
    this.password = data.password;
  }
}
