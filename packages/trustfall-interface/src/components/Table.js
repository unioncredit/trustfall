import {
  Table as UITable,
  TableRow as UITableRow,
  TableCell,
  LoadingSpinner,
  Box,
} from "@unioncredit/ui";
import TableRow from "./TableRow";

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

  return (
    <div className="tableWrapper">
      <UITable>
        <UITableRow>
          <TableCell fixedSize></TableCell>
          <TableCell fixedSize></TableCell>
          <TableCell>Account</TableCell>
          <TableCell align="right">Origination Fees</TableCell>
        </UITableRow>
        {data.map((row, i) => (
          <TableRow {...row} index={i} key={row.member} />
        ))}
      </UITable>
    </div>
  );
}
