import { useTeamCall, useTeamCalls } from "./useTeam";

export default function useTeamAddresses(teamKey) {
  const { value } = useTeamCall(teamKey, "id", []);

  const calls = [];
  const count = Math.max(0, value ? Number(value[0]) : 0);

  for (let i = 1; i <= count; i++) {
    calls.push({
      method: "ownerOf",
      args: [i],
    });
  }

  const results = useTeamCalls(teamKey, calls);
  const addresses = results.filter(r => r?.value).map((result) => result && result.value[0]);

  return {
    addresses,
    count: addresses.length,
  }
}