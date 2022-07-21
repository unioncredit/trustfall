import { Label, Box } from "@unioncredit/ui";

import "./RoundInfo.scss";

export default function RoundInfo() {
  return (
    <Box className="RoundInfo" justify="space-between" align="center" fluid>
      <Label ml="12px" mb={0} color="white">
        Round 1 of 3
      </Label>
      <Label m={0} color="white">
        Remaining: <span>11d 18h 20m</span>
      </Label>
    </Box>
  );
}
