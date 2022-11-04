import Match from '../../database/models/Match';
import Team from '../../database/models/Team';
import {
  IMatchCreated,
  IMatches,
  IMatchFinished,
  IMatchUpdate,
} from '../../Interfaces/Matches/IMatch';

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

  public async getMatchesInProgress(
    isInProgress: boolean
  ): Promise<IMatches[]> {
    const matches = await this._model.findAll({
      include: [
        { model: Team, as: 'teamaway', attributes: ['teamname'] },
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
      ],
      where: { inProgress: isInProgress },
    });
    return matches as IMatches[];
  }

  public async create(matchInfo: IMatchCreated): Promise<IMatchCreated> {
    return await this._model.create(matchInfo);
  }

  public async finished(id: string | undefined): Promise<IMatchFinished> {
    await this._model.update({ inProgress: false }, { where: { id } });

    return { message: 'Finished' };
  }

  public async update(
    id: string | undefined,
    updateInfo: IMatchUpdate
  ): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = updateInfo;
    await this._model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } }
    );
  }
}
