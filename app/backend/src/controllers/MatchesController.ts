import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) { }

  public findAllMaches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress === undefined) {
      const result = await this.matchesService.findAllMaches();
      return res.status(200).json(result);
    }
    const result = await this.matchesService.findAllMachesProgress(inProgress === 'true');
    return res.status(200).json(result);
  };

  public finishMatches = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchesService.finishMatches(+id);
    return res.status(200).json({ message: 'Finished' });
  };

  public updateMatches = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchesService.updateMatches(+id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Placar Alterado' });
  };

  public createMatches = async (req: Request, res: Response) => {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;
    const homeTeam = await this.matchesService.checkTeamid(homeTeamId);
    const awayTeam = await this.matchesService.checkTeamid(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    if (homeTeamId === awayTeamId) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }
    const result = await this.matchesService.createMatches(
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
    );

    return res.status(201).json(result);
  };
}
