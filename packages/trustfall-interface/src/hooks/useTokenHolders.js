import { useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import { contract, nftAddress } from "hooks/useNFT";
import { useEffect, useState } from "react";
import getScore, { getPairTotals } from "utils/score";
import { userManager, userManagerAddress } from "./useAccountInfo";
import useChainId from "./useChainId";

export default function useTokenHolders() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const { library } = useEthers();
  const chainId = useChainId();
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const nft = contract.attach(nftAddress[chainId]).connect(library);
      const id = await nft.id();

      const um = userManager
        .attach(userManagerAddress[chainId])
        .connect(library);

      const resp = await Promise.all(
        Array(Number(id.toString()))
          .fill(0)
          .map(async (_, i) => {
            const address = await nft.ownerOf(i + 1);

            const isMember = await um.checkIsMember(address);
            const stakers = await um.getStakerAddresses(address);

            return {
              address,
              stakers,
              isMember,
            };
          })
      );

      const holderAddresses = resp.map((r) => r.address.toLowerCase());

      const respWithVouches = await Promise.all(
        resp.map(async (row) => {
          const vouches = await Promise.all(
            row.stakers
              .filter((staker) =>
                holderAddresses.includes(staker.toLowerCase())
              )
              .map(async (staker) => [
                staker,
                await um.getVouchingAmount(staker, row.address),
              ])
          );

          const vouchesSum = vouches.reduce(
            (acc, vouch) => acc.add(vouch[1]),
            BigNumber.from(0)
          );

          return { ...row, vouches, vouchesSum };
        })
      );

      const pairTotals = getPairTotals(respWithVouches);

      const respWithScores = respWithVouches.map((row) => ({
        ...row,
        score: getScore(row.vouches, pairTotals),
      }));

      setData(respWithScores.sort((a, b) => b.score - a.score));
    }

    fetchData();
  }, [refreshCounter]);

  return { data, refresh: () => setRefreshCounter((x) => x + 1) };
}
