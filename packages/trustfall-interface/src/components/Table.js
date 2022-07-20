import { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import {
  Table as UITable,
  TableRow,
  TableCell,
  LoadingSpinner,
  Box,
} from "@unioncredit/ui";

import fetchTableData from "fetchers/fetchTableData";
import Avatar from "components/Avatar";

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
        <TableRow>
          <TableCell fixedSize></TableCell>
          <TableCell fixedSize></TableCell>
          <TableCell>Account</TableCell>
          <TableCell align="right">Vouches</TableCell>
          <TableCell align="right">Vouch Amount</TableCell>
          <TableCell align="right">Total Score</TableCell>
        </TableRow>
        {data.slice(0, 10).map((row) => (
          <TableRow key={row.member}>
            <TableCell fixedSize>1</TableCell>
            <TableCell fixedSize className="avatarCell">
              <Avatar address={row.member} size={24} />
              <span className="isMember">
                {row.isMember ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7Z"
                      fill="#D1FAE5"
                    />
                    <path
                      d="M4.5 7.5L6 9L9.5 5.5"
                      stroke="#10B981"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span></span>
                )}
              </span>
            </TableCell>
            <TableCell>
              {row.member.slice(0, 6)}...{row.member.slice(-4)}
            </TableCell>
            <TableCell align="right">12</TableCell>
            <TableCell align="right">2,356.00</TableCell>
            <TableCell align="right">356.00</TableCell>
          </TableRow>
        ))}
      </UITable>
    </div>
  );
}
