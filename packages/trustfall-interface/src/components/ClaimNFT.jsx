import "./ClaimNFT.scss";

import { useState } from "react";
import { useEthers } from "@usedapp/core";
import { default as cn } from "classnames";
import { Box, Text, Label, Button } from "@unioncredit/ui";

import useTeam from "hooks/useTeam";
import useAccountInfo from "hooks/useAccountInfo";
import ConnectButton from "components/ConnectButton";
import { TEAMS } from "../constants";
import format from "utils/format";
import { formatUnits } from "ethers/lib/utils";

const mintCost = "1000000000000000"; // 0.01 ETH

export default function ClaimNFT({
  data,
  setShowShare,
  accountBalance,
  refreshData,
}) {
  const [team, setTeam] = useState(TEAMS[2]); // todo: default to team with the lowest members
  const [loading, setLoading] = useState(false);
  const [selectEnabled, setSelectEnabled] = useState(false);

  const { account } = useEthers();
  const info = useAccountInfo();

  const { send: mint } = useTeam(team.key, "mint");

  const handleRedeem = async () => {
    try {
      setLoading(true);
      const resp = await mint(
        account,
        [],
        info.checkIsMember ? {} : { value: mintCost }
      );
      if (resp) setShowShare(true);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      typeof refreshData === "function" && refreshData();
    }
  };

  return (
    <Box className="ClaimNFT" fluid direction="vertical">
      <Box w="100%" mb="16px" justify="space-between">
        <Box direction="vertical" fluid>
          <Label as="p" m={0} className="uppercase">
            Select your team
          </Label>
          <Label as="p" m={0} className="uppercase fg-zinc500">
            Once chosen, forever bound
          </Label>
        </Box>
        <Box>
          {account ? (
            !accountBalance ? (
              <Button label="Loading wallet status" disabled={true} />
            ) : accountBalance.gt(0) ? (
              <Button label="Already claimed" disabled={true} />
            ) : selectEnabled ? (
              <Button
                label={`Join ${team.label}`}
                onClick={handleRedeem}
                loading={loading}
                className="button--black"
              />
            ) : (
              <Button
                label="Select a Team"
                onClick={() => setSelectEnabled(true)}
              />
            )
          ) : (
            <ConnectButton label="Connet Wallet to Redeem" />
          )}
        </Box>
      </Box>
      <Box className="ClaimNFT__teams" fluid>
        {TEAMS.map(({ id, key, label }) => (
          <div
            onClick={() => setTeam(TEAMS[id])}
            className={cn(`ClaimNFT__team ClaimNFT__team--${key}`, {
              unselected: selectEnabled && team.id !== id,
            })}
          >
            <Text>{label}</Text>
            <Text>
              Team of {data[key].count}
              <br />
              {format(Number(formatUnits(data[key].totals.score)), 2)} Points
            </Text>
          </div>
        ))}
      </Box>
    </Box>
  );
}
