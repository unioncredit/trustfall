import { Link } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import { Box, Button } from "@unioncredit/ui";

import "./Navigation.scss";

export default function Navigation() {
  const { activateBrowserWallet, account } = useEthers();

  return (
    <Box fluid mb="18px" className="Navigation">
      <Box className="Navigation__items">
        <Button
          mr="4px"
          as={Link}
          to="/"
          className="button--selected"
          label="Leaderboard"
          variant="secondary"
        />
        <Button
          mr="4px"
          as={Link}
          to="/rules"
          label="Game Rules"
          variant="secondary"
        />
      </Box>
      <Box ml="auto" className="Navigation__action">
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
