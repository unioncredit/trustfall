import { Box, Text, Button, Label, Heading } from "@unioncredit/ui";
import { useEthers } from "@usedapp/core";
import { useMemo } from "react";
import format from "utils/format";

import "./MyStats.scss";

export default function MyStats({ data }) {
  const { account } = useEthers();

  const accountData = useMemo(() => {
    if (!data) return { index: -1 };

    const index = data.findIndex(
      (row) => row.member.toLowerCase() === account.toLowerCase()
    );

    return { index, ...data[index] };
  }, [account]);

  const stats = [
    { value: `#${accountData.index + 1}`, label: `of ${data?.length}` },
    { value: "1,234.12", label: "Your score" },
    { value: accountData.trustCount || "0", label: "Vouches acq." },
    {
      value: format(accountData.trustAmount || "0"),
      label: "Total Vouch (DAI)",
    },
    // Second row
    { value: "0", label: "Vouchees Defaulted" },
    { value: accountData.trustForCount || "0", label: "Vouches Provided" },
    {
      value: format(accountData.stakeAmount || "0"),
      label: "Your stake (DAI)",
    },
    {
      value: format(accountData.trustForAmount || "0"),
      label: "Vouch Given (DAI)",
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
        <Text m={0} color="white">
          Your Stats & Position
        </Text>
        <Button variant="secondary" label="Go To Union App" />
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
      <Label mt="12px" mb={0} as="p" color="white">
        How does scoring work?
      </Label>
      <Label as="p" size="small" color="grey400">
        Scores are counted on amount of vouches acquired, total vouch amount as
        well as vouches provided. Your total vouch is based on the minimum of
        the amount stake and the trust amount set by those vouching for you on
        Union. Learn more about the game rules and scoring
      </Label>
    </Box>
  );
}
