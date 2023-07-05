import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { Optimism, useCalls, useEthers } from "@usedapp/core";

import UserManagerABI from "abis/userManager.json";
import useChainId from "./useChainId";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const userManagerAddress = {
  [Optimism.chainId]: "0x8E195D65b9932185Fcc76dB5144534e0f3597628",
};

const userManagerIft = new utils.Interface(UserManagerABI);
export const userManager = new Contract(ZERO_ADDRESS, userManagerIft);

export default function useAccountInfo() {
  const { account } = useEthers();
  const chainId = useChainId();

  const attachedUserManager =
    userManagerAddress[chainId] &&
    userManager.attach(userManagerAddress[chainId]);

  const calls = [
    {
      contract: attachedUserManager,
      method: "getTotalLockedStake",
      args: [account],
    },
    {
      contract: attachedUserManager,
      method: "getStakerBalance",
      args: [account],
    },
    {
      contract: attachedUserManager,
      method: "checkIsMember",
      args: [account],
    },
  ];

  const results = useCalls(userManagerAddress[chainId] && calls);

  return (
    userManagerAddress[chainId] &&
    results &&
    results.reduce(
      (acc, result, i) => ({
        ...acc,
        [calls[i].method]: result?.value?.[0],
      }),
      {}
    )
  );
}
