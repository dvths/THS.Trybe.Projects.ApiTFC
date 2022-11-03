import { IMatchService } from '../Interfaces/Services/IMatchService';
import { IMatches } from '../Interfaces/Matches/IMatch';
import { MatchesRepository } from '../Repositories/MatchesRepository/MatchesRepository';

export class MatchService implements IMatchService {
  constructor(private repository = new MatchesRepository()) {}

  public async getAllMatches(): Promise<IMatches[]> {
    return await this.repository.getAllMatches()
  }

  public async getAllMatchesInProgress(isInProgress: boolean): Promise<IMatches[]> {
    return await this.repository.getMatchesInProgress(isInProgress);
  }
}
