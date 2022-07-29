import { Link, useLocation } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import { Box, Button } from "@unioncredit/ui";
import { ReactComponent as External } from "@unioncredit/ui/lib/icons/externalinline.svg";

import ConnectButton from "components/ConnectButton";

import "./Navigation.scss";

export default function Navigation() {
  const location = useLocation();
  const { account } = useEthers();

  return (
    <Box fluid mb="18px" className="Navigation">
      <Box className="Navigation__items">
        <Button
          mr="4px"
          as={Link}
          to="/"
          className={location.pathname === "/" ? "button--selected" : ""}
          label="Leaderboard"
          variant="secondary"
        />
        <Button
          mr="4px"
          as={Link}
          to="/rules"
          className={
            location.pathname.includes("rules") ? "button--selected" : ""
          }
          label="Game Rules"
          variant="secondary"
        />
        <Button
          mr="4px"
          as="a"
          target="_blank"
          href="https://guild.xyz/trustfall-players-lobby"
          className="discordButton"
          label="Secret Telegram"
          iconPosition="end"
          icon={External}
          variant="secondary"
        />
      </Box>
      <Box ml="auto" className="Navigation__action">
        {account ? (
          <div className="Navigation__accountButton">
            {account.slice(0, 6)}...{account.slice(-4)}
          </div>
        ) : (
          <ConnectButton label="Connect" />
        )}
      </Box>
    </Box>
  );
}
