import {
  Button,
  Modal,
  ModalOverlay,
  Box,
  Label,
  Heading,
} from "@unioncredit/ui";

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
          <Heading align="center">
            Congratulations! <br />
            You’re now a player in trustfall.
          </Heading>
          <Label as="p" align="center" mb="4px" color="grey400">
            Convince players on your team to vouch for you.
          </Label>
          <Box align="center" justify="center">
            <Box as="a" href={twitterLink} target="_blank" fluid>
              <Button mt="8px" label="Share on twitter" fluid />
            </Box>
          </Box>
        </Box>
      </Modal>
    </ModalOverlay>
  );
}
