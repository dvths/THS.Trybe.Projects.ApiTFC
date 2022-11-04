import Team from '../database/models/Team';
import Match from '../database/models/Match';

export type DataForBoard = { teams: Team[]; finishedMatches: Match[] };
