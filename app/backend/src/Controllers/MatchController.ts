import { Request, Response } from 'express';
import { IMatchService } from '../Interfaces/Services/IMatchService';

export class MatchController {
  private readonly _matchService: IMatchService;

  constructor(matchService: IMatchService) {
    this._matchService = matchService;
  }

  public async getAll(request: Request, response: Response): Promise<Response> {
    const { inProgress } = request.query;
    let result;
    if (inProgress) {
      const isInProgress = inProgress == 'true';
      result = await this._matchService.getAllMatchesInProgress(isInProgress);
    } else {
      result = await this._matchService.getAllMatches();
    }
    return response.status(200).json(result);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const result = await this._matchService.create(request.body);
    return response.status(201).json(result);
  }

  public async finished(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const result = await this._matchService.finished(id);
    return response.status(200).json(result);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    await this._matchService.update(id, request.body);
    return response.status(200).json({message: 'Updeted'});

  }
}
