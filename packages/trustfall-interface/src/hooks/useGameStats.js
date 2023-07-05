import useTeamStats from "./useTeamStats";

export default function useGameStats() {
  const players = [];
  const cyan = useTeamStats("cyan");
  const magenta = useTeamStats("magenta");
  const yellow = useTeamStats("yellow");
  const black = useTeamStats("black");

  const {
    addresses: cAddresses,
    data: cData,
  } = cyan;
  const {
    addresses: mAddresses,
    data: mData,
  } = magenta;
  const {
    addresses: yAddresses,
    data: yData,
  } = yellow;
  const {
    addresses: bAddresses,
    data: bData,
  } = black;

  cAddresses.forEach(address => players.push({
    ...cData[address],
    team: "cyan",
    address
  }));
  mAddresses.forEach(address => players.push({
    ...mData[address],
    team: "magenta",
    address
  }));
  yAddresses.forEach(address => players.push({
    ...yData[address],
    team: "yellow",
    address
  }));
  bAddresses.forEach(address => players.push({
    ...bData[address],
    team: "black",
    address
  }));

  return {
    cyan,
    magenta,
    yellow,
    black,
    players: players.sort((a, b) => b.score.sub(a.score)),
  }
}