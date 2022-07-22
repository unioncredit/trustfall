import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { Arbitrum, Kovan, useCalls, useEthers } from "@usedapp/core";

import UserManagerABI from "abis/userManager.json";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const userManagerAddress = {
  [Kovan.chainId]: "0x391fDb669462FBAA5a7e228f3857281BeCf235EE",
  [Arbitrum.chainId]: "0xb71F3D4342AaE0b8D531E14D2CF2F45d6e458A5F",
};

const userManagerIft = new utils.Interface(UserManagerABI);
export const userManager = new Contract(ZERO_ADDRESS, userManagerIft);

export default function useAccountInfo() {
  const { account, chainId } = useEthers();

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
      method: "getBorrowerAddresses",
      args: [account],
    },
    {
      contract: attachedUserManager,
      method: "getStakerBalance",
      args: [account],
    },
    {
      contract: attachedUserManager,
      method: "getTotalFrozenAmount",
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
