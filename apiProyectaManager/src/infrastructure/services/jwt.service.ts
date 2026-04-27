import jwt, { Secret, SignOptions } from "jsonwebtoken";
import {
  TokenService,
  TokenPayload,
  TokenOptions,
} from "../../domain/services/Token.service";

export class JwtService implements TokenService {
  generate(payload: TokenPayload, options?: TokenOptions): string {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET no definido");
    }

    return jwt.sign(
      payload,
      secret as Secret,
      {
        expiresIn: options?.expiresIn ?? "1h",
      } as jwt.SignOptions,
    );
  }

  verify(token: string): TokenPayload {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    } catch (error) {
      throw new Error("Token inválido o expirado");
    }
  }

  decode(token: string): TokenPayload | null {
    return jwt.decode(token) as TokenPayload | null;
  }
}
