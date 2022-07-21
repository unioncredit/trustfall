import { Grid, Box } from "@unioncredit/ui";

import ClaimNFT from "components/ClaimNFT";
import Table from "components/Table";
import RoundInfo from "components/RoundInfo";

function Leaderboard() {
  return (
    <>
      <Grid.Row>
        <Grid.Col>
          <ClaimNFT />
          <Box mt="16px" fluid>
            <RoundInfo />
          </Box>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col>
          <Box fluid mt="16px">
            <Table />
          </Box>
        </Grid.Col>
      </Grid.Row>
    </>
  );
}

export default Leaderboard;
