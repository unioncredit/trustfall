import React from "react";
import ReactDOM from "react-dom/client";
import { setGridConfiguration } from "@unioncredit/ui";
import { DAppProvider, Kovan } from "@usedapp/core";
import { getDefaultProvider } from "ethers";

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
  networks: [Kovan.chainId],
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
