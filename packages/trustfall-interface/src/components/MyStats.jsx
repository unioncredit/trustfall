import { Box, Text, Label, Heading } from "@unioncredit/ui";
import { useEthers } from "@usedapp/core";
import { formatUnits } from "ethers/lib/utils";
import useAccountInfo from "hooks/useAccountInfo";
import { useTeamCall } from "hooks/useTeam";
import { useMemo } from "react";
import format from "utils/format";

import "./MyStats.scss";

export default function MyStats({ data }) {
  const { account } = useEthers();
  const results = useAccountInfo();
  const { value: cyanBalance } = useTeamCall(
    "cyan",
    "balanceOf",
    account ? [account] : null
  );
  const { value: magentaBalance } = useTeamCall(
    "magenta",
    "balanceOf",
    account ? [account] : null
  );
  const { value: yellowBalance } = useTeamCall(
    "yellow",
    "balanceOf",
    account ? [account] : null
  );
  const { value: blackBalance } = useTeamCall(
    "black",
    "balanceOf",
    account ? [account] : null
  );

  const team = cyanBalance?.[0]?.gt(0)
    ? "Cyan"
    : magentaBalance?.[0]?.gt(0)
    ? "Magenta"
    : yellowBalance?.[0]?.gt(0)
    ? "Yellow"
    : blackBalance?.[0]?.gt(0)
    ? "Black"
    : "";

  const accountData = useMemo(() => {
    if (!data) return { index: -1 };

    const index = data.findIndex(
      (row) => row.address.toLowerCase() === account.toLowerCase()
    );

    return { index, ...data[index] };
  }, [account, data]);

  const stats = [
    // First row
    { value: `#${accountData.index + 1}`, label: `of ${data?.length}` },
    {
      value: format(formatUnits(String(accountData.fees || "0")) || "0", 2),
      label: "Your score",
    },
    // Second row
    {
      value: team,
      label: "Your team",
    },
    {
      value: format(formatUnits(results.getTotalLockedStake || "0"), 2),
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
