import { TEAMS } from "../constants";

export const getTeam = (key) => {
  return TEAMS.find(t => t.key === key);
};