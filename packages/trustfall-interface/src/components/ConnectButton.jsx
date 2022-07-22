import { Button } from "@unioncredit/ui";
import { useEthers } from "@usedapp/core";

export default function ConnectButton({ label = "Connect" }) {
  const { activateBrowserWallet } = useEthers();

  return <Button label={label} onClick={activateBrowserWallet} />;
}
