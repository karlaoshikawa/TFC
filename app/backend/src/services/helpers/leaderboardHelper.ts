import { ILeaderboard, IMatch } from '../../interfaces/ILeaderboard';

const totalPoints = (acc: number, curr: IMatch) => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) {
    return acc + 3;
  }
  if (curr.homeTeamGoals === curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
};

const totalVictories = (acc: number, curr: IMatch) => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
};

const totalDraws = (acc: number, curr: IMatch) => {
  if (curr.homeTeamGoals === curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
};

export const totalLosses = (acc: number, curr: IMatch) => {
  if (curr.homeTeamGoals < curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
};

const matchArrHome = (singleMatch: IMatch[]) => {
  let goals = 0;
  let goalsAdv = 0;
  const result = singleMatch.map((matche) => {
    const teamPoints = {
      name: matche.homeTeam.teamName,
      totalPoints: singleMatch.reduce(totalPoints, 0),
      totalGames: singleMatch.length,
      totalVictories: singleMatch.reduce(totalVictories, 0),
      totalDraws: singleMatch.reduce(totalDraws, 0),
      totalLosses: singleMatch.reduce(totalLosses, 0),
      goalsFavor: goals += matche.homeTeamGoals,
      goalsOwn: goalsAdv += matche.awayTeamGoals,
      goalsBalance: goals - goalsAdv,
      efficiency: (((singleMatch.reduce(totalPoints, 0))
        / (singleMatch.length * 3)) * 100).toFixed(2) };
    return teamPoints;
  });
  return result;
};

export const homeLeaderboard = (arr: IMatch[]) => {
  let leaderboard: ILeaderboard[] = [];
  for (let index = 1; index <= 16; index += 1) {
    const singleMatch = arr.filter((item) => item.homeTeamId === index);
    const result = matchArrHome(singleMatch);
    leaderboard = [...leaderboard, result[result.length - 1]];
  }
  return leaderboard;
};

export const sortArr = (arr: ILeaderboard[]) => arr.sort((b, a) => {
  if (a.totalPoints === b.totalPoints) {
    if (a.goalsBalance === b.goalsBalance) {
      return a.goalsFavor - b.goalsFavor;
    } return a.goalsBalance - b.goalsBalance;
  }
  return a.totalPoints - b.totalPoints;
});
