import { Optimism, useEthers } from "@usedapp/core";

import { config } from "../index";

const DEFAULT_CHAIN_ID = Optimism.chainId;

export default function useChainId() {
  const { chainId } = useEthers();

  return config.networks.map((n) => n.chainId).includes(chainId)
    ? chainId
    : DEFAULT_CHAIN_ID;
}
