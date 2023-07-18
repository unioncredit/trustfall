import "./Leaderboard.scss";

import { useState } from "react";
import { useEthers } from "@usedapp/core";
import { default as cn } from "classnames";
import { Text, Grid, Box, Heading, Button } from "@unioncredit/ui";

import ClaimNFT from "components/ClaimNFT";
import Table from "components/Table";
import { useTeamCall } from "hooks/useTeam";
import MyStats from "components/MyStats";
import Share from "components/Share";
import TeamStats from "components/TeamStats";
import { BigNumber } from "ethers";
import useGameStats from "../hooks/useGameStats";

function Leaderboard() {
  const [view, setView] = useState("pvp"); // pvp, teams
  const [showShare, setShowShare] = useState(false);

  const { account } = useEthers();
  const { value: cyanBalance } = useTeamCall(
    "cyan",
    "balanceOf",
    account ? [account] : null
  );
  const { value: magentaBalance } = useTeamCall(
    "magenta",
    "balanceOf",
    account ? [account] : null
  );
  const { value: yellowBalance } = useTeamCall(
    "yellow",
    "balanceOf",
    account ? [account] : null
  );
  const { value: blackBalance } = useTeamCall(
    "black",
    "balanceOf",
    account ? [account] : null
  );

  const balances =
    cyanBalance?.[0]
      ?.add(magentaBalance?.[0] || BigNumber.from(0))
      ?.add(yellowBalance?.[0] || BigNumber.from(0))
      ?.add(blackBalance?.[0] || BigNumber.from(0)) || BigNumber.from(0);

  const data = useGameStats();

  return (
    <>
      <Grid.Row className="HeaderRow">
        <Grid.Col>
          <Text size="small" className="Leaderboard__intro">
            Embrace the thrill of trust-based finance in Trustfall, a game of
            alliances, risks, and rewards. Trustfall interweaves collective
            strategy and individual audacity, as players build credit lines
            through earning and granting vouches. With color-coded Team NFTs,
            you're more than an individual—you're part of a community, competing
            and collaborating in a dynamic financial ecosystem. It’s not just a
            game, it's an exploration of trust, deceit, and collective power.
            Are you ready to take the fall?
          </Text>

          {/*
          <Box mt="16px">
            <Link to="/rules#howtojoin" className="Leaderboard__link">
              How to join
            </Link>
            <Link to="/rules#gamerules" className="Leaderboard__link">
              Game rules
            </Link>
            <Link to="/rules#prizes" className="Leaderboard__link">
              Prizes
            </Link>
          </Box>
          */}
        </Grid.Col>
        <Grid.Col>
          {account &&
            (balances.gt(0) ? (
              <MyStats data={data} />
            ) : (
              <ClaimNFT
                data={data}
                accountBalance={balances}
                setShowShare={setShowShare}
              />
            ))}
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col>
          <Box fluid mt="48px" direction="vertical">
            <Box mb="16px" justify="space-between" align="center" fluid>
              <Heading m={0} className="Leaderboard__heading">
                Leaderboard
              </Heading>

              <Box className="Leaderboard__controls">
                <Button
                  label="PVP"
                  onClick={() => setView("pvp")}
                  className={cn({ active: view === "pvp" })}
                />
                <Button
                  label="Teams"
                  onClick={() => setView("teams")}
                  className={cn({ active: view === "teams" })}
                />
              </Box>
            </Box>

            {view === "pvp" ? <Table data={data} /> : <TeamStats data={data} />}
          </Box>
        </Grid.Col>
      </Grid.Row>
      {showShare && <Share data={data} onClose={() => setShowShare(false)} />}
    </>
  );
}

export default Leaderboard;
