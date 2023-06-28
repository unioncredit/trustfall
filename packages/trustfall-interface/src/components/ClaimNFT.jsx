import { useState } from "react";
import { useEthers } from "@usedapp/core";
import { Box, Text, Label, Button, Divider } from "@unioncredit/ui";
import { ReactComponent as Info } from "@unioncredit/ui/lib/icons/wireInfo.svg";
import { ReactComponent as Tick } from "@unioncredit/ui/lib/icons/wireCheck.svg";

import useNFT from "hooks/useNFT";
import useAccountInfo from "hooks/useAccountInfo";
import ConnectButton from "components/ConnectButton";

import "./ClaimNFT.scss";

const mintCost = "10000000000000000"; // 0.01 ETH

export default function ClaimNFT({
  setShowShare,
  accountBalance,
  refreshData,
}) {
  const [loading, setLoading] = useState(false);
  const { account } = useEthers();
  const info = useAccountInfo();

  const { send: mint } = useNFT("mint");

  const handleRedeem = async () => {
    try {
      setLoading(true);
      const resp = await mint(
        [],
        account,
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
      <Box fluid mb="16px">
        <Box direction="vertical" fluid>
          <Text mb={0}>Select your team</Text>
          <Box align="center">
            <Label m={0} as="p" size="small">
              Once chosen forever bound
            </Label>
          </Box>
        </Box>
        <Box>
          {account ? (
            !accountBalance ? (
              <Button label="Loading wallet status" disabled={true} />
            ) : accountBalance.gt(0) ? (
              <Button label="Already claimed" disabled={true} />
            ) : (
              <Box align="center">
                <Button
                  label="Mint Ticket"
                  onClick={handleRedeem}
                  loading={loading}
                />
                <Label
                  as="p"
                  ml="16px"
                  mb={0}
                  className={info.checkIsMember ? "crossout" : ""}
                >
                  Ξ 0.01 Mint Fee
                </Label>
                {info.checkIsMember && (
                  <Label as="p" ml="16px" mb={0} color="green500">
                    😊 Free
                  </Label>
                )}
              </Box>
            )
          ) : (
            <ConnectButton label="Connet Wallet to Redeem" />
          )}
        </Box>
      </Box>
      <Box fluid>
        <div className="ClaimNFT__team ClaimNFT__team--cyan">
          <Text>Cyan</Text>
          <Text>
            Team of 48
            <br />
            69,420 Points
          </Text>
        </div>
        <div className="ClaimNFT__team ClaimNFT__team--magenta">
          <Text>Magenta</Text>
          <Text>
            Team of 48
            <br />
            69,420 Points
          </Text>
        </div>
        <div className="ClaimNFT__team ClaimNFT__team--yellow">
          <Text>Yellow</Text>
          <Text>
            Team of 48
            <br />
            69,420 Points
          </Text>
        </div>
        <div className="ClaimNFT__team ClaimNFT__team--black">
          <Text>Black</Text>
          <Text>
            Team of 48
            <br />
            69,420 Points
          </Text>
        </div>
      </Box>
    </Box>
  );
}
