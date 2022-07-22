import {
  Table as UITable,
  TableRow as UITableRow,
  TableCell,
  LoadingSpinner,
  Box,
} from "@unioncredit/ui";
import TableRow from "./TableRow";
import { getPairTotals } from "utils/score";

import "./Table.scss";

export default function Table({ data }) {
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

  const pairTotals = getPairTotals(data);

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
          <TableRow
            {...row}
            index={i}
            key={row.member}
            pairTotals={pairTotals}
          />
        ))}
      </UITable>
    </div>
  );
}
