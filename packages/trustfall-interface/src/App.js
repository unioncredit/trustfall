import { useEthers } from "@usedapp/core";
import { Routes, Route } from "react-router-dom";
import { Grid, Layout, Box, Label, AlertBanner } from "@unioncredit/ui";

import Navigation from "components/Navigation";
import Leaderboard from "sections/Leaderboard";
import GameRules from "sections/GameRules";
import { Toaster } from "react-hot-toast";

function App() {
  const { error } = useEthers();

  return (
    <div className="App">
      <Toaster />

      {error && error.message.includes("Unsupported") && (
        <AlertBanner label={error.message} />
      )}
      <Layout>
        <Layout.Main>
          <Grid xs>
            <Grid.Row>
              <Grid.Col>
                <Navigation />
              </Grid.Col>
            </Grid.Row>

            <Routes>
              <Route path="/" element={<Leaderboard />} />
              <Route path="/rules" element={<GameRules />} />
            </Routes>

            <Grid.Row>
              <Grid.Col>
                <Box
                  fluid
                  mt="24px"
                  mb="48px"
                  direction="vertical"
                  align="center"
                >
                  <Label as="p" size="small" color="grey500">
                    Built with &hearts; by trustfall.eth on{" "}
                    <a href="https://union.finance/" target="_blank">
                      Union Protocol
                    </a>
                  </Label>
                </Box>
              </Grid.Col>
            </Grid.Row>
          </Grid>
        </Layout.Main>
      </Layout>
    </div>
  );
}

export default App;
