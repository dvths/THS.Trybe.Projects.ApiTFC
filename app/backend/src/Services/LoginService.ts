import { compare } from 'bcryptjs';
import { ILogin, ILoginService } from '../Interfaces/Services/ILoginService';
import User from '../database/models/User';
import { UnauthorizedError } from '../Errors/UnauthorizedError';
import {
  IToken,
  ITokenDecodedRole,
} from '../Interfaces/Auth/IToken';
import { TokenManager } from '../Utils/TokenManeger';

export class LoginService implements ILoginService {
  constructor(private _model = User) {}

  public async login(credentials: ILogin): Promise<IToken> {
    const user = await this._model.findOne({
      where: { email: credentials.email },
    });

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
