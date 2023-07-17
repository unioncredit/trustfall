import React from "react";
import ReactDOM from "react-dom/client";
import { Optimism, DAppProvider } from "@usedapp/core";
import { setGridConfiguration } from "@unioncredit/ui";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

import "./index.scss";

export const config = {
  readOnlyChainId: Optimism.chainId,
  readOnlyUrls: {
    [Optimism.chainId]:
      "https://optimism-mainnet.infura.io/v3/19d3c955dd4e4d3ab5dd5ffed9d756db",
  },
  multicallAddresses: {
    [Optimism.chainId]: "0x142E2FEaC30d7fc3b61f9EE85FCCad8e560154cc",
  },
  networks: [Optimism],
};

setGridConfiguration({
  breakpoints: [410, 611, 992, 1200, 1600, 1920],
  containerWidths: [410, 1253, 1253, 1253, 1253, 1253],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DAppProvider config={config}>
    <Router>
      <App />
    </Router>
  </DAppProvider>
);
