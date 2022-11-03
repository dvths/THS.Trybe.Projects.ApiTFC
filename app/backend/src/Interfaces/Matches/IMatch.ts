import Match from '../../database/models/Match';

export interface IMatch {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
} 

export interface IMatchCreated extends IMatch {
  id: number;
  inProgress: boolean;
}

export interface IMatches extends Match {
  teamHome: {
    teamName: string;
  };
  teamAway: {
    teamName: string;
  };
}

export type IMatchFinished = { message: 'Finished' };

export type IMatchUpdate = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};
