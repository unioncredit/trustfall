import { Link, useLocation } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import { Box } from "@unioncredit/ui";

import ConnectButton from "components/ConnectButton";

import "./Navigation.scss";

export default function Navigation() {
  const { account } = useEthers();

  return (
    <Box fluid m="24px 0 56px" className="Navigation">
      <Box>
        <Link to="/">
          <img className="logo" src="/trustfall-logo.svg" alt="a group of people catching a falling person" />
        </Link>
      </Box>

      <Box ml="auto" className="Navigation__action">
        {account && (
          <div className="Navigation__accountButton">
            {account.slice(0, 6)}...{account.slice(-4)}
          </div>
        )}

        <ConnectButton label="Connect Wallet" />
      </Box>
    </Box>
  );
}
