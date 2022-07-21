import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useCall, useContractFunction } from "@usedapp/core";

import ABI from "abis/nft.json";

export const itf = new utils.Interface(ABI);
export const nftAddress = "0xe0a738f9e7d889d6eb258b27b22232f6c1192fc3";

export const contract = new Contract(nftAddress, itf);

export default function useNFT(...args) {
  return useContractFunction(contract, ...args);
}

export function useNFTCall(method, args) {
  return (
    useCall(method && args && contract && { contract, method, args }) ?? {}
  );
}
