import React from "react";
import ReactDOM from "react-dom/client";
import { DAppProvider, Kovan } from "@usedapp/core";
import { setGridConfiguration } from "@unioncredit/ui";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

import "./index.scss";

const config = {
  readOnlyChainId: Kovan.chainId,
  readOnlyUrls: {
    [Kovan.chainId]:
      "https://kovan.infura.io/v3/b3359a5636d64b858b26fc5cccab8578",
  },
  multicallAddresses: {
    [Kovan.chainId]: "0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a",
  },
  networks: [Kovan],
};

setGridConfiguration({
  breakpoints: [410, 611, 992, 1200, 1600, 1920],
  containerWidths: [410, 624, 624, 624, 624, 624],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DAppProvider config={config}>
    <Router>
      <App />
    </Router>
  </DAppProvider>
);
