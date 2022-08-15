import { Box, Heading, Label, Text } from "@unioncredit/ui";

import "./Rules.scss";

export default function Rules() {
  return (
    <Box className="Rules" direction="vertical">
      <Heading m={0}>Trustfall: the game</Heading>
      <Text mt="16px">How to Play the Game</Text>
      <ul>
        <li>Mint a battle royale NFT to signal you’re playing.</li>
        <ul>
          <li>If you’re on the list it’ll be free</li>
          <li>
            If you’re not on the list it’ll be 0.01 ETH to add a bit of friction
            for Sybil
          </li>
        </ul>
        <li>Become a Union member on arbitrum</li>
        <li>
          Convince players who also have the battle royale tickets to vouch for
          you.
        </li>
        <li>
          Each Round the Top 50 according to that rounds “Game” will get a vouch
          equal to the prize pool multiplied by their share of the clr
          determined points.
        </li>
      </ul>
      <Text mt="16px">Round Schedule</Text>
      <table>
        <tbody>
          <tr>
            <td>Round</td>
            <td>Game Title</td>
            <td>Prize Pool</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Vouch for Vouch</td>
            <td>$2,000</td>
          </tr>
          <tr>
            <td>2</td>
            <td>TBA</td>
            <td>$3,000</td>
          </tr>
          <tr>
            <td>3</td>
            <td>TBA</td>
            <td>$5,000</td>
          </tr>
        </tbody>
      </table>
      <Text mt="16px">How to win?</Text>
      <Label>tldr: Dont lose!</Label>
      <Label>
        At a high level points will be allocated based on reasonably fair
        formulas that take each rounds game activity as input, and uses a
        similar algo to what (Gitcoin uses for Quadratic funding) to make it so
        whales don’t run the field.
      </Label>
      <Label>
        [Complete] Round 1 will assign points based on amount and size of vouch.
        Round 2 and the Finale are surprises to be announced just before the
        Rounds begin.
      </Label>
      <Label>
        [Active til 8/29] Round 2 will assign points based on the borrowing
        activity of you and the people you vouch for. The more you and your
        vouchees borrow the more points you get. eg If you borrow 1000 you get
        5pts and everyone that vouched for you gets 5pts.
      </Label>
      <Label>
        Note: Points are tallied off chain, and we reserve the right to remove
        any badly done sybil attacks.
      </Label>
    </Box>
  );
}
