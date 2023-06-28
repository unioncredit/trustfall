import { useState } from "react";
import { useEthers } from "@usedapp/core";
import { Grid, Box } from "@unioncredit/ui";

import ClaimNFT from "components/ClaimNFT";
import Table from "components/Table";
import { useNFTCall } from "hooks/useNFT";
import MyStats from "components/MyStats";
import useTokenHolders from "hooks/useTokenHolders";
import Share from "components/Share";

function Leaderboard() {
  const [showShare, setShowShare] = useState(false);
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
          {balances?.[0].gt(0) ? (
            <MyStats data={holders} />
          ) : (
            <ClaimNFT
              refreshData={refresh}
              accountBalance={balances?.[0]}
              setShowShare={setShowShare}
            />
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
      {showShare && <Share onClose={() => setShowShare(false)} />}
    </>
  );
}

export default Leaderboard;
