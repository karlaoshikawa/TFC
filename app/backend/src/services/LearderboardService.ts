import { ModelStatic } from 'sequelize';
import { ILeaderboard, IMatch } from '../interfaces/ILeaderboard';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamModel';
import { homeLeaderboard, sortArr } from './helpers/leaderboardHelper';
import { awayLeaderboard } from './helpers/leaderboardHelperAway';

export default class LeaderBoardService {
  private model: ModelStatic<MatchesModel> = MatchesModel;
  // private static modelTeam: ModelStatic<TeamsModel> = TeamsModel;

  // static async FindAllTeams() {
  //   const result = await LeaderBoardService.modelTeam.findAll();
  //   return result;
  // }

  public async teamsPerformaceHome() {
    const match = await this.model.findAll({
      where: { inProgress: false },
      include: [{ model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } }],
    });
    const leaderboardResult = homeLeaderboard(match as unknown as IMatch[]);
    const result = sortArr(leaderboardResult);
    return result;
  }

  public async teamsPerformaceAway() {
    const match = await this.model.findAll({
      where: { inProgress: false },
      include: [{ model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    const leaderboardResult = awayLeaderboard(match as unknown as IMatch[]);
    const result = sortArr(leaderboardResult);
    return result;
  }

  private totalLeaderboardObj = (teamHome: ILeaderboard[], teamAway: ILeaderboard[]) => teamHome
    .map((time, index) => {
      if (time.name === teamAway[index].name) {
        return {
          name: time.name,
          totalPoints: time.totalPoints + teamAway[index].totalPoints,
          totalGames: time.totalGames + teamAway[index].totalGames,
          totalVictories: time.totalVictories + teamAway[index].totalVictories,
          totalDraws: time.totalDraws + teamAway[index].totalDraws,
          totalLosses: time.totalLosses + teamAway[index].totalLosses,
          goalsFavor: time.goalsFavor + teamAway[index].goalsFavor,
          goalsOwn: time.goalsOwn + teamAway[index].goalsOwn,
          goalsBalance: time.goalsBalance + teamAway[index].goalsBalance,
          efficiency: (((time.totalPoints + teamAway[index].totalPoints)
        / ((time.totalGames + teamAway[index].totalGames) * 3)) * 100).toFixed(2),
        };
      }
      return null;
    });

  public totalLeardeboard = async () => {
    const away = await this.model.findAll({
      where: { inProgress: false },
      include: [{ model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    const home = await this.model.findAll({
      where: { inProgress: false },
      include: [{ model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } }],
    });
    const lbAway = awayLeaderboard(away as unknown as IMatch[]);
    const lbHome = homeLeaderboard(home as unknown as IMatch[]);
    const leaderboardResult = this.totalLeaderboardObj(
      lbHome as unknown as ILeaderboard[],
      lbAway as unknown as ILeaderboard[],
    );
    const result = sortArr(leaderboardResult as unknown as ILeaderboard[]);

    return result;
  };
}
