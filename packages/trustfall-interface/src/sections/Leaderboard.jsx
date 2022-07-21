import { useEthers } from "@usedapp/core";
import { useEffect, useMemo, useState } from "react";
import { Grid, Box } from "@unioncredit/ui";

import ClaimNFT from "components/ClaimNFT";
import Table from "components/Table";
import RoundInfo from "components/RoundInfo";
import { useNFTCall } from "hooks/useNFT";
import MyStats from "components/MyStats";
import fetchTableData from "fetchers/fetchTableData";
import useTokenHolders from "hooks/useTokenHolders";

function Leaderboard() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [allData, setData] = useState(null);
  const { chainId, account } = useEthers();
  const holders = useTokenHolders();
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
  }, [chainId, refreshCounter]);

  const data = useMemo(() => {
    if (!allData || !holders) return null;
    const lowerCaseHolders = holders.map((s) => s.toLowerCase());
    return allData.filter((row) => {
      return lowerCaseHolders.includes(row.member.toLowerCase());
    });
  }, [allData, holders]);

  return (
    <>
      <Grid.Row>
        <Grid.Col>
          <Box mb="16px" fluid>
            <RoundInfo />
          </Box>
          {balances?.[0].gt(0) ? (
            <MyStats data={data} />
          ) : (
            <ClaimNFT
              refreshData={() => {
                setData(null);
                setRefreshCounter((x) => x + 1);
              }}
              accountBalance={balances?.[0]}
            />
          )}
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
