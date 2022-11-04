import { IToken, ITokenDecodedRole } from '../Auth/IToken';
import { IUserCredentials } from '../User/IUser';

export interface ILoginService {
  login(credentials: IUserCredentials): Promise<IToken>;
  validate(authorization: string | undefined): ITokenDecodedRole
}
