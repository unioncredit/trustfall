import { BigNumber, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";

import useTeamAddresses from "./useTeamAddresses";
import UserManagerABI from "abis/userManager.json";
import UTokenABI from "abis/uToken.json";
import { useCalls } from "@usedapp/core";

const userManagerInt = new utils.Interface(UserManagerABI);
const userManagerContract = new Contract("0x8E195D65b9932185Fcc76dB5144534e0f3597628", userManagerInt);

const uTokenInt = new utils.Interface(UTokenABI);
const uTokenContract = new Contract("0xE478b5e7A423d7CDb224692d0a816CA146A744b2", uTokenInt);

const WAD = BigNumber.from("1000000000000000000");
const ZERO = BigNumber.from(0);

export default function useTeamStats(teamKey) {
  const { count, addresses } = useTeamAddresses(teamKey);

  const creditCalls = addresses.map(addr => ({
    contract: userManagerContract,
    method: "getCreditLimit",
    args: [addr],
  }));

  const borrowCalls = addresses.map(addr => ({
    contract: uTokenContract,
    method: "getBorrowed",
    args: [addr],
  }));

  const stakeCalls = addresses.map(addr => ({
    contract: userManagerContract,
    method: "getStakerBalance",
    args: [addr],
  }));

  const creditResults = useCalls(creditCalls);
  const borrowResults = useCalls(borrowCalls);
  const stakeResults = useCalls(stakeCalls);

  const results = addresses.map((addr, idx) => {
    const credit = creditResults[idx]?.value[0] ?? ZERO;
    const borrow = borrowResults[idx]?.value[0] ?? ZERO;
    const stake = stakeResults[idx]?.value[0] ?? ZERO;
    const vouch = credit.add(borrow);
    const score = vouch.add(stake.div(10));

    return {
      credit,
      borrow,
      stake,
      vouch,
      score,
    }
  });

  const data = addresses.reduce((acc, address, idx) => ({
    ...acc,
    [address]: results[idx],
  }), {});

  const totals = results.reduce((acc, result) => ({
    credit: acc.credit.add(result.credit),
    borrow: acc.borrow.add(result.borrow),
    stake: acc.stake.add(result.stake),
    vouch: acc.vouch.add(result.vouch),
    score: acc.score.add(result.score),
  }), {
    credit: ZERO,
    borrow: ZERO,
    stake: ZERO,
    vouch: ZERO,
    score: ZERO,
  });

  return {
    count,
    addresses,
    data,
    totals,
  }
}