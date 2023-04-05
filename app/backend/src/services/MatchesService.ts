import { ModelStatic } from 'sequelize';
import MachesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamModel';

export default class MatchesService {
  private model: ModelStatic<MachesModel> = MachesModel;

  public async findAllMaches(): Promise<MachesModel[]> {
    const result = await this.model.findAll({
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return result;
  }

  public async findAllMachesProgress(inProgress: boolean | undefined): Promise<MachesModel[]> {
    const result = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return result;
  }

  public async finishMatches(id: number) {
    const result = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    return result;
  }

  public async updateMatches(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const result = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return result;
  }

  public async createMatches(
    homeTeamId: number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals: number,
  ) {
    const data = {
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
    };
    const { id } = await this.model.create({ ...data, inProgress: true });
    return { id, ...data, inProgress: true };
  }

  public async checkTeamid(id: number) {
    const result = await this.model.findByPk(id);
    return result;
  }
}
