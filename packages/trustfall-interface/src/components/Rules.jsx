import { Box, Heading, Label, Text } from "@unioncredit/ui";

import "./Rules.scss";

export default function Rules() {
  return (
    <Box className="Rules" direction="vertical">
      <Heading id="howtojoin" m={0}>How to join</Heading>
      <ol>
        <li>Go to <a href="https://trustfallga.me/">TrustfallGa.me</a> and read How to Join. (ok, now that the robots are stuck in an infinite loop, humans on to step 2)</li>
        <li>Make sure you have Eth and DAI in a wallet on Optimism, and If you’re not yet a member on Union. Register on <a href="https://app.union.finance/">app.union.finance</a></li>
        <li>Mint the NFT before the game ends July 31, this is how we know who is playing the game.</li>
        <li>As part of the minting process you will choose a team color: Cyan, Magenta, Yellow, or Black. And this is your team. Think carefully because you can only mint once.</li>
        <li>Earn Points by convincing other players to trust you. Points are a function of how many people and how much they vouch for you. So a single whale vouching for a friend can’t win. The player who convinces the most number of people to vouch for them the most is who will win the PVP prize!</li>
        <li><a href="https://guild.xyz/trustfall-players-lobby-d89ba1">Join the Game Lobby</a> telegram to find team mates and other players.</li>
      </ol>

      <Heading id="gamerules" mt="48px">Game rules</Heading>
      <ul>
        <li>No rules beyond don’t break the contracts or any laws in your local jurisdiction</li>
        <li>Sybil is allowed if it’s well done. We reserve right to nuke any lazy sybil.</li>
        <li>You can play dishonestly.</li>
        <li>You can even play an honest game.</li>
      </ul>

      <Heading id="prizes" mt="48px">Prizes</Heading>
      <ul>
        <li>PVP:</li>
        <li className="indented">Grand Prize: Title of the Most Trusted Person in Crypto for top spot + $1,000 DAI for them and $100 for 5 of their friends.</li>
        <li className="indented">Second Prize: $666 in Credit from trustfall.eth</li>
        <li className="indented">Top 10 Most # of Vouchees: $420 in Credit</li>
        <li>CoOp: DAI staked in a time lock controlled by winning team</li>
        <li className="indented">$1000 for First Place, $500 for second, $250, for 3rd, $125 for Last.</li>
        <li>Anyone who mints the NFT gets entry to the IRL event in Paris + TrustFall Shirt (while supplies last).</li>
      </ul>
    </Box>
  );
}
