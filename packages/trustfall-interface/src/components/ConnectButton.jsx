import { Button, Modal, ModalOverlay, Box } from "@unioncredit/ui";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Arbitrum, Kovan, useEthers } from "@usedapp/core";
import { useState } from "react";

export default function ConnectButton({ label = "Connect" }) {
  const [open, setOpen] = useState(false);
  const { activate, activateBrowserWallet } = useEthers();

  async function activateWalletConnect() {
    const provider = new WalletConnectProvider({
      rpc: {
        [Arbitrum.chainId]:
          "https://arbitrum-mainnet.infura.io/v3/b3359a5636d64b858b26fc5cccab8578",
        [Kovan.chainId]:
          "https://kovan.infura.io/v3/b3359a5636d64b858b26fc5cccab8578",
      },
      infuraId: "d8df2cb7844e4a54ab0a782f608749dd",
    });
    await provider.enable();
    activate(provider);
    setOpen(false);
  }

  return (
    <>
      <Button label={label} onClick={() => setOpen(true)} />
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
