export interface ITokenDecodedRole {
  role: string;
}

export interface ITokenPayload extends ITokenDecodedRole {
  id: number
  username: string;
}

export interface ITokenDecodedPayload extends ITokenPayload {
  iat: number;
  exp: number;
}

export interface IToken {
  token: string;
}
