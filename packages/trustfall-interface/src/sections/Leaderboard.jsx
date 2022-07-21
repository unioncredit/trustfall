import { useEthers } from "@usedapp/core";
import { useEffect, useState } from "react";
import { Grid, Box } from "@unioncredit/ui";

import ClaimNFT from "components/ClaimNFT";
import Table from "components/Table";
import RoundInfo from "components/RoundInfo";
import { useNFTCall } from "hooks/useNFT";
import MyStats from "components/MyStats";
import fetchTableData from "fetchers/fetchTableData";

function Leaderboard() {
  const [data, setData] = useState(null);
  const { chainId, account } = useEthers();
  const { value: balances } = useNFTCall(
    "balanceOf",
    account ? [account] : null
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const tableData = await fetchTableData(chainId);
        console.log("fetched table data", tableData);
        setData(tableData);
      } catch (e) {
        console.log("failed to fetch table data", e);
      }
    }

    chainId && !data && fetchData();
  }, [chainId]);

  return (
    <>
      <Grid.Row>
        <Grid.Col>
          {balances?.[0] ? (
            <MyStats data={data} />
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
            <Table data={data} />
          </Box>
        </Grid.Col>
      </Grid.Row>
    </>
  );
}

export default Leaderboard;
