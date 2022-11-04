import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IScoreBoard } from '../Interfaces/LeaderBoard/ISocoreBoard';
import { ScoreBoard } from '../Utils/ScoreBoard';
import { LeaderBoardRepository } from '../Repositories/LeaderBoardRepository/LeaderBoardRepository';

export class LeadereBoardService {
  constructor(private _leaderBoardRepository = new LeaderBoardRepository()) {}

  public async getBoard(location?: string): Promise<IScoreBoard[]> {
    const { teams, finishedMatches } =
      await this._leaderBoardRepository.getData();

    let filteredMatches = finishedMatches;

    const unsortedBoard = teams.map((team: Team) => {
      if (location === 'home') {
        filteredMatches = this.filterHomeMatches(team.id, finishedMatches);
      }
      if (location === 'away') {
        filteredMatches = this.filterAwayMatches(team.id, finishedMatches);
      }

      const scoreBoard = new ScoreBoard(
        team.id,
        team.teamName,
        filteredMatches
      );
      return scoreBoard.generateBoard();
    });
    return this.sortBoard(unsortedBoard);
  }

  private filterHomeMatches = (
    teamId: number,
    finishedMatches: Match[]
  ): Match[] => {
    const filteredHomeMatches = finishedMatches.filter(
      (match) => teamId === match.homeTeam
    );

    return filteredHomeMatches;
  };

  private filterAwayMatches = (
    teamId: number,
    finishedMatches: Match[]
  ): Match[] => {
    const filteredAwayMatches = finishedMatches.filter(
      (match) => teamId === match.awayTeam
    );

    return filteredAwayMatches;
  };

  private sortBoard = (unsortedResult: IScoreBoard[]): IScoreBoard[] => {
    const sorted = unsortedResult.sort(
      (a, b) =>
        b.totalPoints - a.totalPoints ||
        b.totalVictories - a.totalVictories ||
        b.goalsBalance - a.goalsBalance ||
        b.goalsFavor - a.goalsFavor ||
        b.goalsOwn - a.goalsOwn
    );

    return sorted;
  };
}
