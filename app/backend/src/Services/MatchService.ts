import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { IMatchService } from '../Interfaces/Services/IMatchService';
import { IMatches } from '../Interfaces/Matches/IMatch';

export class MatchService implements IMatchService {
  constructor(private _model = Match) {}

  public async getAllMatches(): Promise<IMatches[]> {
    const matches = await this._model.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches as IMatches[];
  }
}
