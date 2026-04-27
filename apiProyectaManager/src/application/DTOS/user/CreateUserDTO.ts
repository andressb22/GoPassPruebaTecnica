import { userType } from "./user.type";

export class CreateUserDTO {
  email: string;
  name: string;
  password: string;

  constructor(data: userType) {
    if (!data.email) {
      throw new Error("Email requerido");
    }

    if (!data.name) {
      throw new Error("Nombre requerido");
    }

    if (!data.password) {
      throw new Error("Contraseña requerida");
    }

    this.email = data.email;
    this.name = data.name;
    this.password = data.password;
  }
}
