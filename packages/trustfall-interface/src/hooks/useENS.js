import { fetchENS as fetchEnsData } from "fetchers/fetchENS";
import { useEffect, useState } from "react";

export default function useENS(address) {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const fetchData = await fetchEnsData(address);
      setData(fetchData);
    }

    address && fetchData();
  }, [address]);

  return data;
}
