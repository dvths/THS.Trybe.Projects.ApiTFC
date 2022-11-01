import { compare } from 'bcryptjs';
import { generateToken, verifyToken } from '../Utils/JasonWebToken';
import { ILogin, ILoginService } from '../Interfaces/Services/ILoginService';
import User from '../database/models/User';
import { UnauthorizedError } from '../Errors/UnauthorizedError';
import {
  IToken,
  ITokenDecodedRole,
} from '../Interfaces/Auth/IToken';

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
        const token = generateToken({ id, username, role });

        return { token };
      }
    }
    throw new UnauthorizedError('Incorrect email or password');
  }

  validate = (authorization: string | undefined): ITokenDecodedRole => {
    if (authorization) {
      const { role } = verifyToken(authorization);
      return { role };
    }

    throw new UnauthorizedError('Token must be a valid token');
  };
}
