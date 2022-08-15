import { useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import { fetchBorrows, config } from "@unioncredit/data";

import { contract, nftAddress } from "hooks/useNFT";
import { useEffect, useState } from "react";
import { userManager, userManagerAddress } from "./useAccountInfo";
import useChainId from "./useChainId";

export default function useTokenHolders() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const { library } = useEthers();
  const chainId = useChainId();
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      config.set("chainId", chainId);
      const borrows = await fetchBorrows();

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
            const borrowers = await um.getBorrowerAddresses(address);
            const lcBorrowers = borrowers.map((x) => x.toLowerCase());

            const fees = borrows.reduce((acc, borrow) => {
              const account = borrow.account.toLowerCase();
              if (account === address || lcBorrowers.includes(account)) {
                return acc + Number(borrow.fee);
              }
              return acc;
            }, 0);

            return {
              address,
              stakers,
              isMember,
              fees,
              score: fees,
            };
          })
      );

      setData(resp.sort((a, b) => b.score - a.score));
    }

    fetchData();
  }, [refreshCounter, chainId]);

  return { data, refresh: () => setRefreshCounter((x) => x + 1) };
}
