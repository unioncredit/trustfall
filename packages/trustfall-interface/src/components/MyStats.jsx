import { Box, Text, Label, Heading, Button } from "@unioncredit/ui";
import { useEthers } from "@usedapp/core";
import { formatUnits } from "ethers/lib/utils";
import format from "utils/format";

import "./MyStats.scss";
import { calculatePosition, getTeam } from "utils/teams";

export default function MyStats({ data }) {
  const { account } = useEthers();
  const { players } = data;

  const player = players.find(p => p.address === account);
  const team = getTeam(player?.team);

  const stats = [
    // First row
    { value: team ? `#${calculatePosition(team.key, data)}` : "N/A", label: `of 4` },
    {
      value: format(formatUnits(player?.score || "0"), 2),
      label: "Your score",
    },
    // Second row
    {
      value: team?.label || "N/A",
      label: "Your team",
    },
    {
      value: format(formatUnits(player?.vouch || "0"), 2),
      label: "Your total vouch",
    },
  ];

  return (
    <Box className="MyStats" direction="vertical">
      <Box
        fluid
        align="center"
        justify="space-between"
        className="MyStats__header"
        mb="12px"
      >
        <Text m={0}>Your position & stats</Text>

        <Button
          as="a"
          target="_blank"
          mr="4px"
          href="https://guild.xyz/trustfall-players-lobby-d89ba1"
          label="Enter lobby"
        />
      </Box>
      <div className="MyStats__grid">
        {stats.map((stat) => (
          <div className="MyStats__grid__item" key={stat.label}>
            <Heading m={0}>{stat.value}</Heading>
            <Label size="small" color="grey400">
              {stat.label}
            </Label>
          </div>
        ))}
      </div>
    </Box>
  );
}
