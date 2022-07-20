import { Grid, Layout, Box, Label } from "@unioncredit/ui";

import Navigation from "components/Navigation";
import ClaimNFT from "components/ClaimNFT";
import Table from "components/Table";

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
            <Grid.Row>
              <Grid.Col>
                <Box fluid mt="16px">
                  <Table />
                </Box>
              </Grid.Col>
            </Grid.Row>
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
                    Built with &hearts; by Union
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
