import { formatUnits } from "ethers/lib/utils";

export function getPairTotals(rows) {
  let tot = {};

  for (const row of rows) {
    for (const [s1, v1] of row.vouches) {
      if (!tot[s1]) tot[s1] = {};

      for (const [s2, v2] of row.vouches) {
        if (!tot[s1][s2]) tot[s1][s2] = 0;
        const nv1 = Number(formatUnits(v1));
        const nv2 = Number(formatUnits(v2));
        tot[s1][s2] += (nv1 * nv2) ** 0.5;
      }
    }
  }

  return tot;
}

// score takes map of vouches for a staker
export default function getScore(vouches, pairTotals, threshold = 25) {
  let tot = 0;

  for (const [s1, v1] of vouches) {
    for (const [s2, v2] of vouches) {
      const nv1 = Number(formatUnits(v1));
      const nv2 = Number(formatUnits(v2));

      const pairTotalDiv = pairTotals[s1][s2];

      tot += ((nv1 * nv2) ** 0.5) / (pairTotalDiv / (threshold + 1));
    }
  }

  return tot * 100;
}
