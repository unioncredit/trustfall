import {
  fetchStakers,
  fetchTrustlines,
  fetchMemberApplications,
  config,
} from "@unioncredit/data";
import { ethers } from "ethers";
import sumBy from "lodash/sumBy";
import groupBy from "lodash/groupBy";

const zero = "0";
const etherToNumber = (n) => Number(ethers.utils.formatEther(n || zero));

function parseVouchers(data) {
  const grouped = groupBy(data, (x) => x.borrower);
  return Object.keys(grouped).reduce((acc, borrower) => {
    const trustAmount = sumBy(grouped[borrower], (x) =>
      etherToNumber(x.amount || zero)
    );
    return {
      ...acc,
      [borrower.toLowerCase()]: {
        amount: trustAmount,
        count: grouped[borrower].length,
      },
    };
  }, {});
}

function parseStakers(data) {
  const grouped = groupBy(data, (x) => x.account);
  return Object.keys(grouped).reduce((acc, staker) => {
    const stakeSum = sumBy(grouped[staker], (x) =>
      etherToNumber(x.stakedAmount || zero)
    );
    return { ...acc, [staker.toLowerCase()]: stakeSum };
  }, {});
}

export default async function fetchTableData(chainId) {
  config.set("chainId", chainId);
  const memberships = groupBy(await fetchMemberApplications(), "applicant");
  const trustlines = parseVouchers(await fetchTrustlines());
  const stakers = parseStakers(await fetchStakers());

  const data = await Promise.all(
    Object.keys(stakers).map(async (member) => {
      return {
        ens: null,
        member,
        isMember: !!memberships[member],
        trustAmount: trustlines[member]?.amount || zero,
        trustCount: trustlines[member]?.count || zero,
      };
    })
  );

  return data;
}
