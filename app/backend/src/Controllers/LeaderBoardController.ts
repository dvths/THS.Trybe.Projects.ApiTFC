import { Request, Response } from 'express';
import { LeadereBoardService } from '../Services/LeaderBoardService';

export class LeaderBoardController {
  constructor(private _leaderBoardService = new LeadereBoardService()) {}

  public async getHome(_request: Request, response: Response) {
    const result = await this._leaderBoardService.getBoard('home');
    return response.status(200).json(result);
  }

  public async getAway(_request: Request, response: Response) {
    const result = await this._leaderBoardService.getBoard('away');
    return response.status(200).json(result);
  }

  public async getAll(_request: Request, response: Response) {
    const result = await this._leaderBoardService.getBoard();
    return response.status(200).json(result);
  }
}
