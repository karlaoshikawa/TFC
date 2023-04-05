import { ModelStatic } from 'sequelize';
import TeamsModel from '../database/models/TeamModel';
import { ITeams } from '../interfaces/ITeams';

export default class TeamsService {
  private model: ModelStatic<TeamsModel> = TeamsModel;

  public async getAllTeams(): Promise<ITeams[]> {
    const result = await this.model.findAll();
    return result;
  }

  public async findTeamById(id: number): Promise<ITeams | null> {
    const result = await this.model.findOne({ where: { id } });
    return result;
  }
}
