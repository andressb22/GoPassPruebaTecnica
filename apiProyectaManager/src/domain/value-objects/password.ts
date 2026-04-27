export class Password {
  readonly value: string;

  constructor(password: string) {
    if (!password) {
      throw new Error("Contraseña requerida");
    }

    if (password.length < 8) {
      throw new Error("La contraseña debe tener al menos 8 caracteres");
    }

    if (!/[A-Z]/.test(password)) {
      throw new Error("La contraseña debe tener una mayúscula");
    }

    if (!/[a-z]/.test(password)) {
      throw new Error("la contraseña debe tener una minúscula");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      throw new Error("la contraseña debe tener un carácter especial");
    }

    this.value = password;
  }
}
