import { Grid, Layout, Box } from "@unioncredit/ui";

import Navigation from "components/Navigation";
import ClaimNFT from "components/ClaimNFT";

function App() {
  return (
    <div className="App">
      <Layout>
        <Layout.Main>
          <Grid xs>
            <Grid.Row align="center">
              <Grid.Col align="center">
                <Box mt="48px" mb="58px">
                  <img className="logo" src="/trustfall-logo.svg" />
                </Box>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col>
                <Navigation />
                <ClaimNFT />
              </Grid.Col>
            </Grid.Row>
          </Grid>
        </Layout.Main>
      </Layout>
    </div>
  );
}

export default App;
