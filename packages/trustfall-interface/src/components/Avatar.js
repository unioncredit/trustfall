import { useState } from "react";
import { Avatar as UIAvatar } from "@unioncredit/ui";
import makeBlockie from "ethereum-blockies-base64";

export default function Avatar({ address, size, ens }) {
  const [error, setError] = useState(false);
  const blockie = makeBlockie(address);

  return (
    <UIAvatar
      size={size}
      src={error ? blockie : ens.avatar || blockie}
      onError={() => setError(true)}
    />
  );
}

Avatar.defaultProps = {
  size: 26,
};
