import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import {
  Arbitrum,
  Kovan,
  useCall,
  useContractFunction,
  useEthers,
} from "@usedapp/core";

import ABI from "abis/nft.json";

export const itf = new utils.Interface(ABI);
export const nftAddress = {
  [Kovan.chainId]: "0xf4Fa9801E89754C8A587253A835f15C035290a1c",
  [Arbitrum.chainId]: "0xafb9E64d8B84C20E21299E0468d57FCC04F14Acd",
};

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const contract = new Contract(ZERO_ADDRESS, itf);

export default function useNFT(...args) {
  const { chainId } = useEthers();
  return useContractFunction(
    chainId && nftAddress[chainId] && contract.attach(nftAddress[chainId]),
    ...args
  );
}

export function useNFTCall(method, args) {
  const { chainId } = useEthers();

  return (
    useCall(
      chainId &&
        method &&
        args &&
        contract &&
        nftAddress[chainId] && {
          contract: contract.attach(nftAddress[chainId]),
          method,
          args,
        }
    ) ?? {}
  );
}
