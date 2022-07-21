import { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import {
  Table as UITable,
  TableRow as UITableRow,
  TableCell,
  LoadingSpinner,
  Box,
} from "@unioncredit/ui";
import fetchTableData from "fetchers/fetchTableData";
import TableRow from "./TableRow";

import "./Table.scss";

export default function Table() {
  const { chainId } = useEthers();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const tableData = await fetchTableData(chainId);
      console.log("fetched table data", tableData);
      setData(tableData);
    }

    chainId && fetchData();
  }, [chainId]);

  if (!data) {
    return (
      <div className="tableWrapper">
        <UITable>
          <Box py="24px" fluid align="center" justify="center">
            <LoadingSpinner size={24} />
          </Box>
        </UITable>
      </div>
    );
  }

  return (
    <div className="tableWrapper">
      <UITable>
        <UITableRow>
          <TableCell fixedSize></TableCell>
          <TableCell fixedSize></TableCell>
          <TableCell>Account</TableCell>
          <TableCell align="right">Vouches</TableCell>
          <TableCell align="right">Vouch Amount</TableCell>
          <TableCell align="right">Total Score</TableCell>
        </UITableRow>
        {data.slice(0, 10).map((row, i) => (
          <TableRow key={row.member} {...row} index={i} />
        ))}
      </UITable>
    </div>
  );
}
