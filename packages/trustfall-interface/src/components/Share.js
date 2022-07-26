import {
  Button,
  Modal,
  ModalOverlay,
  Box,
  Label,
  Heading,
} from "@unioncredit/ui";
import { ReactComponent as Twitter } from "@unioncredit/ui/lib/icons/twitter.svg";

const twitterLink =
  "https://twitter.com/intent/tweet?text=I%20have%20entered%20the%20game%20of%20trust,%20money,%20and%20betrayal%20on%20https%3A//trustfallga.me/";

export default function Share({ onClose }) {
  return (
    <ModalOverlay onClick={onClose}>
      <Modal size="medium">
        <Box direction="vertical" fluid align="center">
          <Box fluid mb="16px" justify="center">
            <img src="/nft.png" width="100%" />
          </Box>
          <Heading align="center" color="white">
            Congratulations! <br />
            You’re now a player in trustfall.
          </Heading>
          <Label as="p" align="center" mb="4px" color="grey400">
            Convince players who also have the battle royale tickets to vouch
            for you.
          </Label>
          <Label as="p" align="center" mb="24px" color="grey400">
            Each Round the Top 50 according to that rounds “Game” will get a
            vouch equal to the prize pool multiplied by their share of the clr
            determined points.
          </Label>
          <Box align="center" justify="center">
            <Box as="a" href={twitterLink} target="_blank" fluid>
              <Button label="Co-Op Mode" icon={Twitter} fluid />
            </Box>
          </Box>
        </Box>
      </Modal>
    </ModalOverlay>
  );
}
