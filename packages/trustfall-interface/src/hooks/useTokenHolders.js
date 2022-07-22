import { useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import { contract } from "hooks/useNFT";
import { useEffect, useState } from "react";
import { userManager, userManagerAddress } from "./useAccountInfo";

export default function useTokenHolders() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const { chainId, library } = useEthers();
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const nft = contract.connect(library);
      const id = await nft.id();

      const resp = await Promise.all(
        Array(Number(id.toString()))
          .fill(0)
          .map(async (_, i) => {
            const address = await nft.ownerOf(i + 1);

            const um = userManager
              .attach(userManagerAddress[chainId])
              .connect(library);

            const isMember = await um.checkIsMember(address);
            const stakers = await um.getStakerAddresses(address);
            const vouches = await Promise.all(
              stakers.map((staker) => um.getVouchingAmount(staker, address))
            );

            const vouchesSum = vouches.reduce(
              (acc, vouch) => acc.add(vouch),
              BigNumber.from(0)
            );
            // foreach staker get the vouch amount
            return { address, stakers, vouches, vouchesSum, isMember };
          })
      );

      setData(resp);
    }

    fetchData();
  }, [refreshCounter]);

  return { data, refresh: () => setRefreshCounter((x) => x + 1) };
}
