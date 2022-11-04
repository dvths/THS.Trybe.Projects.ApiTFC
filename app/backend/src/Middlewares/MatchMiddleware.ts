import { Request, Response, NextFunction } from 'express';
import { UnprocessableError } from '../Errors/UnprocessableError';

const validateTeams = (request: Request, _response: Response, next: NextFunction ) => {
  const { homeTeam, awayTeam } = request.body; 

  if(homeTeam === awayTeam) throw new UnprocessableError('It is not possible to create a match with two equal teams');

  next();
}

export default validateTeams;

