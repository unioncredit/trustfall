import {
  Table as UITable,
  LoadingSpinner,
  Box,
  Text,
} from "@unioncredit/ui";

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
      <Text m={0}>Mint phase, please check back shortly for rankings</Text>
    </div>
  );
}
