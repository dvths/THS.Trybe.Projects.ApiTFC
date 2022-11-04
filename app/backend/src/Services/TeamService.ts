import { NotFoundParamError } from '../Errors/NotFoundParamError';
import Team from '../database/models/Team';
import { ITeamService } from '../Interfaces/Services/ITeamService';
import { TeamRepository } from '../Repositories/TeamsRepository/TeamsRepository';

export class TeamService implements ITeamService {
  constructor(private _teamRepository = new TeamRepository()) {}

  public async getAll(): Promise<Team[]> {
    return await this._teamRepository.getAll();
  }

  public async getById(id: string): Promise<Team> {
    const teams = await this._teamRepository.getById(id);

    if (!teams) {
      throw new NotFoundParamError('There is no team with such id!');
    }
    return teams;
  }
}
