import { Box, Button } from "@unioncredit/ui";
import { useEthers } from "@usedapp/core";

import "./Navigation.scss";

export default function Navigation() {
  const { activateBrowserWallet, account } = useEthers();

  return (
    <Box fluid mb="18px" className="Navigation">
      <Box>
        <Button
          mr="4px"
          className="button--selected"
          label="Leaderboard"
          variant="secondary"
        />
        <Button mr="4px" label="Game Rules" variant="secondary" />
      </Box>
      <Box ml="auto">
        {account ? (
          <div className="Navigation__accountButton">
            {account.slice(0, 6)}...{account.slice(-4)}
          </div>
        ) : (
          <Button label="Connect" onClick={() => activateBrowserWallet()} />
        )}
      </Box>
    </Box>
  );
}
