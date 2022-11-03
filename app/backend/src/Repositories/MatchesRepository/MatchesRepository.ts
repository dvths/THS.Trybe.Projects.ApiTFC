import Match from '../../database/models/Match';
import Team from '../../database/models/Team';
import { IMatches } from '../../Interfaces/Matches/IMatch';

export class MatchesRepository {
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
