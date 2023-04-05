import { ILeaderboard, IMatch } from '../../interfaces/ILeaderboard';

const totalPoints = (acc: number, curr: IMatch) => {
  if (curr.homeTeamGoals < curr.awayTeamGoals) {
    return acc + 3;
  }
  if (curr.homeTeamGoals === curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
};

const totalVictories = (acc: number, curr: IMatch) => {
  if (curr.homeTeamGoals < curr.awayTeamGoals) {
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
  if (curr.homeTeamGoals > curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
};

const matchArrAway = (singleMatch: IMatch[]) => {
  let goals = 0;
  let goalsAdv = 0;
  const result = singleMatch.map((matche) => {
    const teamPoints = {
      name: matche.awayTeam.teamName,
      totalPoints: singleMatch.reduce(totalPoints, 0),
      totalGames: singleMatch.length,
      totalVictories: singleMatch.reduce(totalVictories, 0),
      totalDraws: singleMatch.reduce(totalDraws, 0),
      totalLosses: singleMatch.reduce(totalLosses, 0),
      goalsFavor: goals += matche.awayTeamGoals,
      goalsOwn: goalsAdv += matche.homeTeamGoals,
      goalsBalance: goals - goalsAdv,
      efficiency: (((singleMatch.reduce(totalPoints, 0))
        / (singleMatch.length * 3)) * 100).toFixed(2) };
    return teamPoints;
  });
  return result;
};

export const awayLeaderboard = (arr: IMatch[]) => {
  let leaderboard: ILeaderboard[] = [];
  for (let index = 1; index <= 16; index += 1) {
    const singleMatch = arr.filter((item) => item.awayTeamId === index);
    const result = matchArrAway(singleMatch);
    leaderboard = [...leaderboard, result[result.length - 1]];
  }
  return leaderboard;
};
