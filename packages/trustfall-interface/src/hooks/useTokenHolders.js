import { useEthers } from "@usedapp/core";
import { contract } from "hooks/useNFT";
import { useEffect, useState } from "react";

export default function useTokenHolders() {
  const { library } = useEthers();
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const nft = contract.connect(library);
      const id = await nft.id();
      const resp = await Promise.all(
        Array(Number(id.toString()))
          .fill(0)
          .map((_, i) => {
            return nft.ownerOf(i + 1);
          })
      );

      setData(resp);
    }

    fetchData();
  }, []);

  return data;
}
