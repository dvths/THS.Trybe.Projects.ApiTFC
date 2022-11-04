import Match from '../../database/models/Match';
import Team from '../../database/models/Team';
import { DataForBoard } from '../../Types/DataForBoards';

export class LeaderBoardRepository {
  constructor(private _matchModel = Match, private _teamModel = Team) {}

  public async getData(): Promise<DataForBoard> {
    const finishedMatches = await this._matchModel.findAll({
      where: { inProgress: false },
    });

    const teams = await this._teamModel.findAll();

    return { teams, finishedMatches };
  }
}
