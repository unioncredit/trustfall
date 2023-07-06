import "./ConnectButton.scss";

import { Button, Modal, ModalOverlay, Box } from "@unioncredit/ui";
import { useEthers } from "@usedapp/core";
import { useState } from "react";
import { default as cn } from "classnames";
import EthereumProvider from "@walletconnect/ethereum-provider";

export default function ConnectButton({ label = "Connect" }) {
  const [open, setOpen] = useState(false);
  const { account, deactivate, activate, activateBrowserWallet } = useEthers();

  async function activateWalletConnect() {
    const provider = await EthereumProvider.init({
      projectId: "627eff658328606c22dd84f2ed347469",
      chains: [10],
      showQrModal: true,
    });
    setOpen(false);
    await provider.enable();
    activate(provider);
  }

  return (
    <>
      <Button
        label={account ? "Disconnect" : label}
        onClick={() => account ? deactivate() : setOpen(true)}
        className={cn("ConnectButton", {
          "ConnectButton--connected": account
        })}
      />
      {open && (
        <ModalOverlay onClick={() => setOpen(false)}>
          <Modal title="Connect Wallet" onClose={() => setOpen(false)}>
            <Box direction="vertical">
              <Button
                fluid
                label="Connect with WalletConnect"
                onClick={activateWalletConnect}
              />
              <Button
                fluid
                mt="4px"
                label="Connect with MetaMask"
                onClick={() => {
                  activateBrowserWallet();
                  setOpen(false);
                }}
              />
            </Box>
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
}
