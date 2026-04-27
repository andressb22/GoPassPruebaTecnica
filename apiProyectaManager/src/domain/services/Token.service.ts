export interface TokenPayload {
  userId: number;
  email?: string;
}

export interface TokenOptions {
  expiresIn?: string; // "1h", "7d"
}

export interface TokenService {
  generate(payload: TokenPayload, options?: TokenOptions): string;
  verify(token: string): TokenPayload;
  decode(token: string): TokenPayload | null;
}

