import { IToken, ITokenDecodedRole } from '../Auth/IToken';
import { IUser } from '../User/IUser';

export interface ILoginService {
  login(credentials: IUser): Promise<IToken>;
  validate(authorization: string | undefined): ITokenDecodedRole
}
