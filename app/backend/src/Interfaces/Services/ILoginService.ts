import { IToken, ITokenDecodedRole } from '../Auth/IToken';

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginService {
  login(credentials: ILogin): Promise<IToken>;
  validate(authorization: string | undefined): ITokenDecodedRole
}
