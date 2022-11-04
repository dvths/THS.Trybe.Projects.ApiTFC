import Match from "../database/models/Match";
import { IScoreBoard } from "../Interfaces/LeaderBoard/ISocoreBoard";

export class ScoreBoard {
  public teamId: number;
  public teamName: string;
  public matches: Match[];

  private _totalPoints: number;
  private _totalGames: number;
  private _totalVictories: number;
  private _totalDraws: number;
  private _totalLosses: number;
  private _goalsFavor: number;
  private _goalsOwn: number;
  private _goalsBalance: number;
  private _efficiency: string;

  constructor(teamId: number, teamName: string, matches: Match[]) {
    this.teamId = teamId;
    this.teamName = teamName;
    this.matches = matches;

    this.totalGames();
    this.totalVictories();
    this.totalDraws();
    this.totalLosses();
    this.goalsFavor();
    this.goalsOwn();
    this.goalsBalance();
    this.totalPoints();
    this.efficiency();
  }

  public generateBoard(): IScoreBoard {
    const board = {
      name: this.teamName,
      totalPoints: this._totalPoints,
      totalGames: this._totalGames,
      totalVictories: this._totalVictories,
      totalDraws: this._totalDraws,
      totalLosses: this._totalLosses,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
      goalsBalance: this._goalsBalance,
      efficiency: this._efficiency,
    };

    return board;
  }

  private totalGames(): void {
    const total = this.matches.reduce((acc, curr) => {
      if (this.teamId === curr.homeTeam) return acc + 1;
      if (this.teamId === curr.awayTeam) return acc + 1;
      return acc;
    }, 0);

    this._totalGames = total;
  }

  private totalVictories(): void {
    const total = this.matches.reduce((acc, curr) => {
      if (this.teamId === curr.homeTeam
          && curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
      if (this.teamId === curr.awayTeam
          && curr.awayTeamGoals > curr.homeTeamGoals) return acc + 1;
      return acc;
    }, 0);

    this._totalVictories = total;
  }

  private totalDraws(): void {
    const total = this.matches.reduce((acc, curr) => {
      if (this.teamId === curr.homeTeam
          && curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
      if (this.teamId === curr.awayTeam
          && curr.awayTeamGoals === curr.homeTeamGoals) return acc + 1;
      return acc;
    }, 0);

    this._totalDraws = total;
  }

  private totalLosses(): void {
    const total = this.matches.reduce((acc, curr) => {
      if (this.teamId === curr.homeTeam
          && curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
      if (this.teamId === curr.awayTeam
          && curr.awayTeamGoals < curr.homeTeamGoals) return acc + 1;
      return acc;
    }, 0);

    this._totalLosses = total;
  }

  private goalsFavor(): void {
    const total = this.matches.reduce((acc, curr) => {
      if (this.teamId === curr.homeTeam) return acc + curr.homeTeamGoals;
      if (this.teamId === curr.awayTeam) return acc + curr.awayTeamGoals;
      return acc;
    }, 0);

    this._goalsFavor = total;
  }

  private goalsOwn(): void {
    const total = this.matches.reduce((acc, curr) => {
      if (this.teamId === curr.homeTeam) return acc + curr.awayTeamGoals;
      if (this.teamId === curr.awayTeam) return acc + curr.homeTeamGoals;
      return acc;
    }, 0);

    this._goalsOwn = total;
  }

  private goalsBalance(): void {
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
  }

  private totalPoints(): void {
    this._totalPoints = (this._totalVictories * 3) + this._totalDraws;
  }

  private efficiency(): void {
    const result = (this._totalPoints / (this._totalGames * 3)) * 100;

    this._efficiency = result.toFixed(2);
  }
}

