import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(private teamService = new TeamsService()) {}

  public getAllTeams = async (_req: Request, res: Response) => {
    const result = await this.teamService.getAllTeams();
    return res.status(200).json(result);
  };

  public findTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.teamService.findTeamById(+id);
    return res.status(200).json(result);
  };
}
