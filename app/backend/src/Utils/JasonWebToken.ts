import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { ITokenPayload, ITokenDecodedPayload } from '../Interfaces/Auth/IToken';
import { UnauthorizedError } from '../Errors/UnauthorizedError';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'jwt_secret';

export const generateToken = (payload: ITokenPayload): string => {
  const token = jwt.sign(payload, SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: '2d',
  });
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const result = jwt.verify(token, SECRET_KEY);
    return result as ITokenDecodedPayload;
  } catch (error) {
    throw new UnauthorizedError('Token must be a valid token');
  }
};
