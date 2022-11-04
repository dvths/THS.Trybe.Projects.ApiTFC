import { IMatchService } from '../Interfaces/Services/IMatchService';
import { IMatchCreated, IMatches, IMatchFinished, IMatchUpdate } from '../Interfaces/Matches/IMatch';
import { MatchesRepository } from '../Repositories/MatchesRepository/MatchesRepository';
import { TeamService } from './TeamService';

export class MatchService implements IMatchService {
  constructor(private repository = new MatchesRepository()) {}

  public async getAllMatches(): Promise<IMatches[]> {
    return await this.repository.getAllMatches()
  }

  public async getAllMatchesInProgress(isInProgress: boolean): Promise<IMatches[]> {
    return await this.repository.getMatchesInProgress(isInProgress);
  }

  public async create(matchInfo: IMatchCreated): Promise<IMatchCreated> {
      const { homeTeam, awayTeam } = matchInfo;

      const teamService = new TeamService();
      await teamService.getById(`${homeTeam}`);
      await teamService.getById(`${awayTeam}`);

      return await this.repository.create({
        ...matchInfo,
        inProgress: true,
      });
    }

  public async finished(id: string | undefined): Promise<IMatchFinished> {
    return await this.repository.finished(id);
  }

  public async update(id: string | undefined, updateInfo: IMatchUpdate): Promise<void>{
    return await this.repository.update(id, updateInfo);
  }
}
