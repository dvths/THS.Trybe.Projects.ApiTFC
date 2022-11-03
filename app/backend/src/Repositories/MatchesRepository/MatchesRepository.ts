import Match from '../../database/models/Match';
import Team from '../../database/models/Team';
import { IMatches } from '../../Interfaces/Matches/IMatch';

export class MatchesRepository {
  constructor(private _model = Match) {}

  public async getAllMatches(): Promise<IMatches[]> {
    const matches = await this._model.findAll({
      include: [
        { model: Team, as: 'teamaway', attributes: ['teamname'] },
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
      ],
    });
    return matches as IMatches[];
  }

  public async getMatchesInProgress(isInProgress: boolean): Promise<IMatches[]> {
    const matches = await this._model.findAll({
      include: [
        { model: Team, as: 'teamaway', attributes: ['teamname'] },
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
      ],
      where: { inProgress: isInProgress },
    });
    return matches as IMatches[];
  }
}
