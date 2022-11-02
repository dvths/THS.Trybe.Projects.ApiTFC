import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { ITokenPayload, ITokenDecodedPayload } from '../Interfaces/Auth/IToken';
import { UnauthorizedError } from '../Errors/UnauthorizedError';

export class TokenManager {
  private static _secret = process.env.JWT_SECRET || 'jwt_secret';

  public static makeToken = (payload: ITokenPayload) => {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: payload }, TokenManager._secret, jwtConfig);

    return token;
  };

  public static verifyToken = (token: string) => {
    try {
      const result = jwt.verify(token, TokenManager._secret);
      return result as ITokenDecodedPayload;
    } catch (error) {
      throw new UnauthorizedError('Token must be a valid token');
    }
  };
}
