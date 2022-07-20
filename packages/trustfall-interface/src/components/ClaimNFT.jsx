import { useEthers } from "@usedapp/core";
import { Box, Text, Label, Button, Divider } from "@unioncredit/ui";
import { ReactComponent as Info } from "@unioncredit/ui/lib/icons/wireInfo.svg";
import { ReactComponent as Tick } from "@unioncredit/ui/lib/icons/wireCheck.svg";

import "./ClaimNFT.scss";

export default function ClaimNFT() {
  const { account } = useEthers();

  return (
    <Box className="ClaimNFT" fluid>
      <Box className="ClaimNFT__imageContainer">
        <div className="ClaimNFT__image" />
      </Box>
      <Box direction="vertical" fluid>
        <Box justify="space-between" fluid className="ClaimNFT__header">
          <Text mb="8px">The Trustfall Ticket NFT</Text>
          <Box align="center">
            <Info width="24px" />
            <Label m={0} as="p">
              5000 DAI Vouch Pool
            </Label>
          </Box>
        </Box>
        <Divider my={0} />
        <Label as="p" mt="11px" mb="4px">
          Who can redeem a Trustfall ticket?
        </Label>
        <ul>
          <li>Addresses with ENS primary record set</li>
          <li>ETHcc Hackathon participants via QR code in swag bag</li>
          <li>Proof of Humanity registered</li>
        </ul>
        <Box mt="10px" className="ClaimNFT__tickItems">
          <Box align="center" mr="8px">
            <Tick width="24px" />
            Union Member
          </Box>
          <Box align="center" mr="8px">
            <Tick width="24px" />
            ENS Set
          </Box>
          <Box align="center" mr="8px">
            <Tick width="24px" />
            Proof of Humanity
          </Box>
        </Box>
        {account ? (
          <Button mt="12px" label="Redeem Ticket" />
        ) : (
          <Button mt="12px" label="Connet Wallet to Redeem" />
        )}
      </Box>
    </Box>
  );
}
