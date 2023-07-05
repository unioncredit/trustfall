import { TEAMS } from "../constants";

export const getTeam = (key) => {
  return TEAMS.find(t => t.key === key);
};

export const calculatePosition = (teamKey, data) => {
  const teamWithHigherScore = TEAMS.filter(t => t.key !== teamKey && data[t.key].totals.score.gte(data[teamKey].totals.score)).length;
  return teamWithHigherScore + 1;
}