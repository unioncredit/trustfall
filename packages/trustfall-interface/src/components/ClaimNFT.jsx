import { useState } from "react";
import { useEthers } from "@usedapp/core";
import { Box, Text, Label, Button, Divider } from "@unioncredit/ui";
import { ReactComponent as Info } from "@unioncredit/ui/lib/icons/wireInfo.svg";
import { ReactComponent as Tick } from "@unioncredit/ui/lib/icons/wireCheck.svg";

import useNFT from "hooks/useNFT";

import "./ClaimNFT.scss";
import useAccountInfo from "hooks/useAccountInfo";

const mintCost = "10000000000000000"; // 0.01 ETH

export default function ClaimNFT({ accountBalance, refreshData }) {
  const [loading, setLoading] = useState(false);
  const { account, activateBrowserWallet } = useEthers();
  const info = useAccountInfo();

  const { send: mint } = useNFT("mint");

  const handleRedeem = async () => {
    try {
      setLoading(true);
      await mint([], account, info.checkIsMember ? {} : { value: mintCost });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      typeof refreshData === "function" && refreshData();
    }
  };

  return (
    <Box className="ClaimNFT" fluid>
      <Box className="ClaimNFT__imageContainer">
        <div className="ClaimNFT__image">
          <img src="/nft.png" />
        </div>
      </Box>
      <Box direction="vertical" fluid>
        <Box justify="space-between" fluid className="ClaimNFT__header">
          <Text mb="8px">The Trustfall Ticket NFT</Text>
          <Box align="center">
            <Info width="24px" />
            <Label m={0} as="p" size="small">
              10,000 DAI Vouch Pool
            </Label>
          </Box>
        </Box>
        <Divider my={0} />
        <Label
          as="p"
          mt="11px"
          mb="4px"
          className="ClaimNFT__highlightedHeader"
        >
          Who can redeem a Trustfall ticket?
        </Label>
        <ul>
          <li>Union Protocol Members</li>
          <li>Anyone (for Ξ 0.01)</li>
          <li>Members of the Myrmidons</li>
        </ul>
        <Box mt="10px" className="ClaimNFT__tickItems">
          <Box
            align="center"
            mr="8px"
            className={info.checkIsMember ? "active" : ""}
          >
            <Tick width="24px" />
            Union Member
          </Box>
        </Box>
        <Box mt="12px">
          {account ? (
            !accountBalance ? (
              <Button label="Loading wallet status" disabled={true} />
            ) : accountBalance.gt(0) ? (
              <Button
                label="Congratulations wallet already claimed"
                disabled={true}
              />
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
            <Button
              label="Connet Wallet to Redeem"
              onClick={() => activateBrowserWallet()}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
