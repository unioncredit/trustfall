forge create \
  --rpc-url $NODE_URL \
  --private-key $PRIVATE_KEY \
  src/TrustfallNft.sol:TrustfallNFT \
  --constructor-args "TrustFall" "TRUST"
