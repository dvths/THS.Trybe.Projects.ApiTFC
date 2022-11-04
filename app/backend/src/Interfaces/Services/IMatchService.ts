import { /*IMatch,*/ IMatchCreated, IMatches, IMatchFinished, IMatchUpdate } from "../Matches/IMatch";

export interface IMatchService {
  getAllMatches(): Promise<IMatches[]>
  getAllMatchesInProgress(isInProgress: boolean): Promise<IMatches[]>
  create(matchInfo: IMatchCreated): Promise<IMatchCreated>
  finished(id: string | undefined): Promise<IMatchFinished>
  update(id: string | undefined, userInfo: IMatchUpdate): Promise<void>
}
