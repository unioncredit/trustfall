import {
  Button,
  Modal,
  ModalOverlay,
  Box,
  Label,
  Heading,
} from "@unioncredit/ui";
import { getTeam } from "utils/teams";
import { useEthers } from "@usedapp/core";

const twitterLink =
  "https://twitter.com/intent/tweet?text=I%20have%20entered%20the%20game%20of%20trust,%20money,%20and%20betrayal%20on%20https%3A//trustfallga.me/";

export default function Share({ data, onClose }) {
  const { account } = useEthers();
  const { players } = data;

  const player = players.find(p => p.address === account);
  const team = getTeam(player?.team);

  return (
    <ModalOverlay onClick={onClose}>
      <Modal size="medium">
        <Box direction="vertical" fluid align="center">
          <Box fluid mb="16px" justify="center">
            <img src={`/nfts/${team?.key || "cyan"}.png`} width="100%" />
          </Box>
          <Heading align="center">
            Congratulations! <br />
            You’re now a player in trustfall.
          </Heading>
          <Label as="p" align="center" mb="4px" color="grey400">
            Convince players on your team to vouch for you.
          </Label>
          <Box align="center" justify="center" fluid>
              <Button
                fluid
                as="a"
                target="_blank"
                href={twitterLink}
                mt="8px"
                label="Share on twitter"
              />

              <Button
                fluid
                as="a"
                target="_blank"
                m="8px 0 0 4px"
                href="https://guild.xyz/trustfall-players-lobby-d89ba1"
                label="Enter lobby"
              />
          </Box>
        </Box>
      </Modal>
    </ModalOverlay>
  );
}
