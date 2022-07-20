import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useCall, useContractFunction } from "@usedapp/core";

import ABI from "abis/nft.json";

export const itf = new utils.Interface(ABI);
export const nftAddress = "0x3b47b7987656a6b9ca58e70937986d0b2041dcfe";

export const contract = new Contract(nftAddress, itf);

export default function useNFT(...args) {
  return useContractFunction(contract, ...args);
}

export function useNFTCall(method, args) {
  return useCall({ contract, method, args }) ?? {};
}
