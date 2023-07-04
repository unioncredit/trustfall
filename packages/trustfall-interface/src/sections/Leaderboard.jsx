import "./Leaderboard.scss";

import { useState } from "react";
import { useEthers } from "@usedapp/core";
import { default as cn } from "classnames";
import { Text, Grid, Box, Heading, Button } from "@unioncredit/ui";

import ClaimNFT from "components/ClaimNFT";
import Table from "components/Table";
import { useNFTCall } from "hooks/useNFT";
import MyStats from "components/MyStats";
import useTokenHolders from "hooks/useTokenHolders";
import Share from "components/Share";
import { Link } from "react-router-dom";
import TeamStats from "components/TeamStats";

function Leaderboard() {
  const [view, setView] = useState("pvp"); // pvp, teams
  const [showShare, setShowShare] = useState(false);

  const { account } = useEthers();
  const { data: holders, refresh } = useTokenHolders();
  const { value: balances } = useNFTCall(
    "balanceOf",
    account ? [account] : null
  );

  return (
    <>
      <Grid.Row>
        <Grid.Col>
          <Text size="small" className="Leaderboard__intro">Embrace the thrill of trust-based finance in Trustfall, a game of alliances, risks, and rewards. Trustfall interweaves collective strategy and individual audacity, as players build credit lines through earning and granting vouches. With color-coded Team NFTs, you're more than an individual—you're part of a community, competing and collaborating in a dynamic financial ecosystem. It’s not just a game, it's an exploration of trust, deceit, and collective power. Are you ready to take the fall?</Text>

          <Box mt="16px">
            <Link to="/rules#howtojoin" className="Leaderboard__link">How to join</Link>
            <Link to="/rules#gamerules" className="Leaderboard__link">Game rules</Link>
            <Link to="/rules#prizes" className="Leaderboard__link">Prizes</Link>
          </Box>
        </Grid.Col>
        <Grid.Col>
          {account && (
            (balances?.[0].gt(0) ? (
              <MyStats data={holders} />
            ) : (
              <ClaimNFT
                refreshData={refresh}
                accountBalance={balances?.[0]}
                setShowShare={setShowShare}
              />
            ))
          )}
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col>
          <Box fluid mt="48px" direction="vertical">
            <Box mb="16px" justify="space-between" align="center" fluid>
              <Heading m={0} className="Leaderboard__heading">Leaderboard</Heading>

              <Box className="Leaderboard__controls">
                <Button
                  label="PVP"
                  onClick={() => setView("pvp")}
                  className={cn({"active": view === "pvp"})}
                />
                <Button
                  label="Teams"
                  onClick={() => setView("teams")}
                  className={cn({"active": view === "teams"})}
                />
              </Box>
            </Box>

            {view === "pvp" ? (
              <Table data={holders} />
            ) : (
              <TeamStats />
            )}
          </Box>
        </Grid.Col>
      </Grid.Row>
      {showShare && <Share onClose={() => setShowShare(false)} />}
    </>
  );
}

export default Leaderboard;
