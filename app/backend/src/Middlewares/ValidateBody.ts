import { RequiredDataErrors } from '../Errors/RequiredDataErrors';
import { NextFunction, Request, Response } from 'express';
import { LoginRequiredData } from '../Types/LoginRequiredData';

export const validateBody =
  (requiredDataForLogin: LoginRequiredData) =>
  (req: Request, _res: Response, next: NextFunction): any => {
    for (const data of requiredDataForLogin) {
      if (!req.body[data]) {
        throw new RequiredDataErrors('All fields must be filled');
      }
    }
    next();
  };
