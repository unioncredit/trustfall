import { formatUnits } from "ethers/lib/utils";
import {
  TableRow as UITableRow,
  TableCell,
  Badge,
  Box,
} from "@unioncredit/ui";
import { ReactComponent as External } from "@unioncredit/ui/lib/icons/external.svg";

import useENS from "hooks/useENS";
import { getProfileLink } from "utils/links";

import Avatar from "components/Avatar";

import "./Table.scss";
import format from "utils/format";
import { getTeam } from "utils/teams";


export default function TableRow({ index, address, team: teamKey, borrow, credit, score, stake, vouch }) {
  const ens = useENS(address);
  const team = getTeam(teamKey);

  return (
    <UITableRow>
      <TableCell fixedSize>{index + 1}</TableCell>
      <TableCell fixedSize className="avatarCell">
        <Avatar address={address} size={24} ens={ens} />
        <span className="isMember">
          <span></span>
        </span>
      </TableCell>
      <TableCell>
        {address.slice(0, 6)}...{address.slice(-4)}
        {ens.name && <Badge color="grey" label={ens.name} ml="8px" />}
        <a href={getProfileLink(address)} target="_blank" rel="noreferrer">
          <External className="external" width="24px" />
        </a>
      </TableCell>
      <TableCell align="flex-end">
        <Box justify="flex-end" align="center">
          {team.label}
          <div className={`team-square team-square--${team.key}`}></div>
        </Box>
      </TableCell>
      <TableCell align="right">
        {format(Number(formatUnits(vouch)), 2)}
      </TableCell>
      <TableCell align="right">
        {format(Number(formatUnits(score)), 2)}
      </TableCell>
    </UITableRow>
  );
}
