import { Request, Response } from 'express';
import { ITeamService } from '../Interfaces/Services/ITeamService';

export class TeamController {
  private readonly _teamservice: ITeamService;

  constructor(teamService: ITeamService) {
    this._teamservice = teamService;
  }

  public async getAll(_request: Request, response: Response): Promise<Response> {
    const result = await this._teamservice.getAll();
    return response.status(200).json(result);
  }

  public async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const result = await this._teamservice.getById(id);
    return response.status(200).json(result);

  }
}
