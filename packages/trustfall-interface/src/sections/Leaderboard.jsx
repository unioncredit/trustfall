import { useEthers } from "@usedapp/core";
import { Grid, Box } from "@unioncredit/ui";

import ClaimNFT from "components/ClaimNFT";
import Table from "components/Table";
import RoundInfo from "components/RoundInfo";
import { useNFTCall } from "hooks/useNFT";
import MyStats from "components/MyStats";
import useTokenHolders from "hooks/useTokenHolders";

function Leaderboard() {
  const { account } = useEthers();
  const { data: holders, refresh } = useTokenHolders();
  const { value: balances } = useNFTCall(
    "balanceOf",
    account ? [account] : null
  );

  return (
    <>
      <Grid.Row>
        <Grid.Col>
          <Box mb="16px" fluid>
            <RoundInfo />
          </Box>
          {balances?.[0].gt(0) ? (
            <MyStats data={holders} />
          ) : (
            <ClaimNFT refreshData={refresh} accountBalance={balances?.[0]} />
          )}
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col>
          <Box fluid mt="16px">
            <Table data={holders} />
          </Box>
        </Grid.Col>
      </Grid.Row>
    </>
  );
}

export default Leaderboard;
