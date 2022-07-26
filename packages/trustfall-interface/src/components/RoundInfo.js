import { Label, Box } from "@unioncredit/ui";
import relativeTime from "utils/relativeTime";

import "./RoundInfo.scss";

const rounds = [
  {
    start: new Date(2022, 6, 29, 16, 20),
    end: new Date(2022, 7, 12, 16, 20),
  },
  {
    start: new Date(2022, 7, 15, 0, 0),
    end: new Date(2022, 7, 29, 0, 0),
  },
];

export default function RoundInfo() {
  const now = new Date();
  const msUntil = rounds[1].end.getTime() - now.getTime();
  const secondsUntil = msUntil / 1000;

  return (
    <Box fluid>
      <Box className="RoundInfo" justify="space-between" align="center">
        <Box direction="vertical">
          <Label mb={0} color="white">
            Round 1 <span className="highlight">Vouch Round</span>
          </Label>
          <Label mb={0} size="small">
            $2,000 prize pool
          </Label>
        </Box>
      </Box>

      <Box
        className="RoundInfo"
        justify="space-between"
        align="center"
        ml="8px"
        fluid
      >
        <Box direction="vertical">
          <Label mb={0} color="white">
            Round 2 <span className="highlight">Surprise Round</span>
          </Label>
          <Label mb={0} size="small">
            $3,000 prize pool
          </Label>
        </Box>
        <Label m={0} color="white" className="blackBox">
          {relativeTime(secondsUntil)}
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
