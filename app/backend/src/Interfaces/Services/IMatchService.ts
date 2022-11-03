import { IMatches } from "../Matches/IMatch";

export interface IMatchService {
  getAllMatches(): Promise<IMatches[]>
  getAllMatchesInProgress(isInProgress: boolean): Promise<IMatches[]>
}
