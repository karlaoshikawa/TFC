import { Request, Response } from 'express';
import LeaderBoardService from '../services/LearderboardService';

export default class MatchesController {
  constructor(private leaderBoardService = new LeaderBoardService()) { }

  public teamsPerformaceHome = async (req: Request, res: Response) => {
    const result = await this.leaderBoardService.teamsPerformaceHome();
    return res.status(200).json(result);
  };

  public teamsPerformaceAway = async (req: Request, res: Response) => {
    const result = await this.leaderBoardService.teamsPerformaceAway();
    return res.status(200).json(result);
  };

  public totalLeardeboard = async (req: Request, res: Response) => {
    const result = await this.leaderBoardService.totalLeardeboard();
    return res.status(200).json(result);
  };
}
