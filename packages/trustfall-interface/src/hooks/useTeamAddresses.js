import { useTeamCall, useTeamCalls } from "./useTeam";

export default function useTeamAddresses(teamKey) {
  const { value } = useTeamCall(teamKey, "id", []);

  const calls = [];
  const count = Math.max(0, value ? value - 1 : 0);

  for (let i = 0; i < count; i++) {
    calls.push({
      method: "ownerOf",
      args: [i],
    });
  }

  const results = useTeamCalls(teamKey, calls);

  return {
    count,
    addresses: results.map(({ value }) => value)
  }
}