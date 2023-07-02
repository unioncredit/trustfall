import { Box, Text, Button, Label, Heading } from "@unioncredit/ui";
import { ReactComponent as External } from "@unioncredit/ui/lib/icons/externalinline.svg";
import { useEthers } from "@usedapp/core";
import { formatUnits } from "ethers/lib/utils";
import useAccountInfo from "hooks/useAccountInfo";
import { useMemo } from "react";
import format from "utils/format";

import "./MyStats.scss";

export default function MyStats({ data }) {
  const { account } = useEthers();
  const results = useAccountInfo();

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
      value: "TODO",
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
        <Text m={0}>
          Your position & stats
        </Text>
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
