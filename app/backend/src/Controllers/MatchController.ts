import { Request, Response } from 'express';
import { IMatchService } from '../Interfaces/Services/IMatchService';

export class MatchController {
  private readonly _matchService: IMatchService;

  constructor(matchService: IMatchService) {
    this._matchService = matchService;
  }

  public async get(_request: Request, response: Response): Promise<Response> {
    const result = await this._matchService.getAllMatches();
    return response.status(200).json(result);
  }
}
