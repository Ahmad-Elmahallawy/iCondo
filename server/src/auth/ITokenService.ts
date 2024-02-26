export interface ITokenPayload {
  id: number;
  username: string;
  password: string;
}

export interface ITokenService {
  createToken: ({ id, username, password }: ITokenPayload) => Promise<string>;
}
