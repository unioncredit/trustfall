import React from "react";
import ReactDOM from "react-dom/client";
import { setGridConfiguration } from "@unioncredit/ui";
import { Mainnet, DAppProvider } from "@usedapp/core";
import { getDefaultProvider } from "ethers";

import App from "./App";

import "./index.scss";

const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider("mainnet"),
  },
};

setGridConfiguration({
  containerWidths: [540, 624, 624, 624, 624, 624],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>
);
