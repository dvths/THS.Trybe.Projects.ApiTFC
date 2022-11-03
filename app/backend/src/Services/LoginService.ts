import { compare } from 'bcryptjs';
import { ILoginService } from '../Interfaces/Services/ILoginService';
import { UnauthorizedError } from '../Errors/UnauthorizedError';
import {
  IToken,
  ITokenDecodedRole,
} from '../Interfaces/Auth/IToken';
import { TokenManager } from '../Utils/TokenManeger';
import { LoginRepository } from '../Repositories/LoginRepository/LoginRepository';
import { IUser } from '../Interfaces/User/IUser';

export class LoginService implements ILoginService {
  constructor(private loginRepository = new LoginRepository()) {}

  public async login(credentials: IUser): Promise<IToken> {
    const user = await this.loginRepository.getByEmail(credentials);

    if (user) {
      const isValidPassword = await compare(
        credentials.password,
        user.password
      );
      if (isValidPassword) {
        const { id, username, role } = user;
        const token = TokenManager.makeToken({id, username, role});

        return { token };
      }
    }
    throw new UnauthorizedError('Incorrect email or password');
  }

  validate = (authorization: string | undefined): ITokenDecodedRole => {
    if (authorization) {
      const { role } = TokenManager.verifyToken(authorization);
      return { role };
    }

    throw new UnauthorizedError('Token must be a valid token');
  };
}
