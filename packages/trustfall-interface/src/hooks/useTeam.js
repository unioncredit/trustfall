import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import {
  useCall, useCalls,
  useContractFunction,
  useEthers,
} from "@usedapp/core";

import ABI from "abis/nft.json";
import { getTeam } from "utils/teams";

export const itf = new utils.Interface(ABI);

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const contract = new Contract(ZERO_ADDRESS, itf);

export default function useTeam(teamKey, ...args) {
  const { chainId } = useEthers();
  const { address } = getTeam(teamKey);

  return useContractFunction(
    chainId && address && contract.attach(address),
    ...args
  );
}

export function useTeamCall(teamKey, method, args) {
  const { chainId } = useEthers();
  const { address } = getTeam(teamKey);

  return (
    useCall(
      chainId &&
        method &&
        args &&
        contract &&
        address && {
          contract: contract.attach(address),
          method,
          args,
        }
    ) ?? {}
  );
}

export function useTeamCalls(teamKey, calls) {
  const { chainId } = useEthers();
  const { address } = getTeam(teamKey);

  return useCalls(chainId && contract && address && calls.map(({ method, args }) => ({
    contract: contract.attach(address),
    method,
    args,
  })))
}
