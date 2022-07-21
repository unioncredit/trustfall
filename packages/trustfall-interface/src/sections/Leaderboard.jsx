import { Grid, Box } from "@unioncredit/ui";
import { useEthers } from "@usedapp/core";

import ClaimNFT from "components/ClaimNFT";
import Table from "components/Table";
import RoundInfo from "components/RoundInfo";
import { useNFTCall } from "hooks/useNFT";
import MyStats from "components/MyStats";

function Leaderboard() {
  const { account } = useEthers();
  const { value: balances } = useNFTCall(
    "balanceOf",
    account ? [account] : null
  );

  return (
    <>
      <Grid.Row>
        <Grid.Col>
          {balances?.[0] ? (
            <MyStats />
          ) : (
            <ClaimNFT accountBalance={balances?.[0]} />
          )}
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
