import "./Table.scss";

import {
  Table as UITable,
  TableRow as UITableRow,
  TableCell,
  LoadingSpinner,
  Box,
} from "@unioncredit/ui";
import TableRow from "./TableRow";
import { TEAMS } from "../constants";

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

  const { players } = data;

  return (
    <div className="tableWrapper">
      <UITable>
        <UITableRow>
          <TableCell fixedSize></TableCell>
          <TableCell fixedSize></TableCell>
          <TableCell>Account</TableCell>
          <TableCell align="right">Team</TableCell>
          <TableCell align="right">Vouch Amount</TableCell>
          <TableCell align="right">Total Score</TableCell>
        </UITableRow>
        {players.map((row, i) => (
          <TableRow
            {...row}
            index={i}
            key={row.address}
          />
        ))}
      </UITable>
    </div>
  );
}
