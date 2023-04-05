import { Request, Response, NextFunction } from 'express';
import { ModelStatic } from 'sequelize';

import TeamsModel from '../database/models/TeamModel';

export default class ValidMatches {
  protected static model: ModelStatic<TeamsModel> = TeamsModel;

  public static checkTeam = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeamId, awayTeamId } = req.body;

    const homeTeam = await this.model.findByPk(homeTeamId);
    const awayTeam = await this.model.findByPk(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return res.status(422).json({ message: 'There is no team with such id!' });
    }

    return next();
  };

  public static checkTeamVSTeam = (req: Request, res: Response, next: NextFunction) => {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }

    return next();
  };
}
