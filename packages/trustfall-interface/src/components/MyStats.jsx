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
    { value: "1,234.12", label: "Your score" },
    { value: accountData.trustCount || "0", label: "Vouches acq." },
    {
      value: format(accountData.trustAmount || "0"),
      label: "Total Vouch (DAI)",
    },
    // Second row
    {
      value: format(results.getBorrowerAddresses?.length || "0"),
      label: "Vouches Given",
    },
    {
      value: format(formatUnits(results.getStakerBalance || "0"), 2),
      label: "Stake (DAI)",
    },
    {
      value: format(formatUnits(results.getTotalLockedStake || "0"), 2),
      label: "Locked stake (DAI)",
    },
    {
      value: format(formatUnits(results.getTotalFrozenAmount || "0"), 2),
      label: "Defaulted (DAI)",
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
        <Button
          className="goToUnionButton"
          variant="secondary"
          label={
            <>
              Go To Union App <External />
            </>
          }
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
