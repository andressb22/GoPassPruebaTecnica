export class Email {
  readonly value: string;

  constructor(email: string) {
    if (!email) {
      throw new Error("Email requerido");
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      throw new Error("Email inválido");
    }

    this.value = email.toLowerCase();
  }
}
