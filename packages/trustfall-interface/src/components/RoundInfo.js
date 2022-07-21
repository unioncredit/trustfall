import { Label, Box } from "@unioncredit/ui";

import "./RoundInfo.scss";

export default function RoundInfo() {
  return (
    <Box fluid>
      <Box className="RoundInfo" justify="space-between" align="center" fluid>
        <Box direction="vertical">
          <Label mb={0} color="white">
            Round 1 <span className="highlight">Vouch Round</span>
          </Label>
          <Label mb={0} size="small">
            $2,000 prize pool
          </Label>
        </Box>
        <Label m={0} color="white" className="blackBox">
          0d 0h 0m
        </Label>
      </Box>

      <Box
        className="RoundInfo"
        justify="space-between"
        align="center"
        ml="8px"
      >
        <Box direction="vertical">
          <Label mb={0} color="white">
            Round 2 <span className="highlight">Surprise Round</span>
          </Label>
          <Label mb={0} size="small">
            $3,000 prize pool
          </Label>
        </Box>
      </Box>

      <Box
        className="RoundInfo"
        justify="space-between"
        align="center"
        ml="8px"
      >
        <Box direction="vertical">
          <Label mb={0} color="white">
            Round 3 <span className="highlight">End Game</span>
          </Label>
          <Label mb={0} size="small">
            $5,000 prize pool
          </Label>
        </Box>
      </Box>
    </Box>
  );
}
