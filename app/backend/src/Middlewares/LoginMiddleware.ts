import { Request, Response, NextFunction } from 'express';
import { LoginService } from '../Services/LoginService';
import { RequiredDataErrors } from '../Errors/RequiredDataErrors';
import { UnauthorizedError } from '../Errors/UnauthorizedError';
import { IUser } from '../Interfaces/User/IUser';

export const validateFields = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  const user: IUser = request.body;

  if (!user.email || !user.password) {
    throw new RequiredDataErrors('All fields must be filled');
  }

  next();
};

export const authentication = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;

  const loginService = new LoginService();
  const { role } = loginService.validate(authorization);

  if (!role) {
    throw new UnauthorizedError('Token must be a valid token');
  }

  next();
};
