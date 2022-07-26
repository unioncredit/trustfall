import { useEthers } from "@usedapp/core";
import { formatUnits } from "ethers/lib/utils";
import {
  TableRow as UITableRow,
  TableCell,
  Badge,
  Tooltip,
  Box,
} from "@unioncredit/ui";
import { ReactComponent as External } from "@unioncredit/ui/lib/icons/external.svg";
import { ReactComponent as UnionWhite } from "@unioncredit/ui/lib/icons/unionwhite.svg";

import useENS from "hooks/useENS";
import getEtherscanLink from "utils/getEtherscanLink";

import Avatar from "components/Avatar";

import "./Table.scss";
import format from "utils/format";

const team = [];

export default function TableRow({ address, isMember, fees, index: i }) {
  const ens = useENS(address);
  const { chainId } = useEthers();

  return (
    <UITableRow>
      <TableCell fixedSize>{i + 1}</TableCell>
      <TableCell fixedSize className="avatarCell">
        <Avatar address={address} size={24} ens={ens} />
        <span className="isMember">
          {isMember ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7Z"
                fill="#D1FAE5"
              />
              <path
                d="M4.5 7.5L6 9L9.5 5.5"
                stroke="#10B981"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <span></span>
          )}
        </span>
      </TableCell>
      <TableCell>
        {address.slice(0, 6)}...{address.slice(-4)}
        {ens.name && <Badge color="grey" label={ens.name} ml="8px" />}
        {team.includes(address.toLowerCase()) && (
          <Tooltip
            content={
              <>
                Union Team Member
                <br />
                Not eligible for prize
              </>
            }
            position="right"
          >
            <Box ml="4px">
              <UnionWhite width="24px" />
            </Box>
          </Tooltip>
        )}
        <a href={getEtherscanLink(chainId, address, "ADDRESS")} target="_blank">
          <External className="external" width="24px" />
        </a>
      </TableCell>
      <TableCell align="right">
        {format(Number(formatUnits(fees.toString())), 2)}
      </TableCell>
    </UITableRow>
  );
}
