trustfall=$(forge create \
  --rpc-url $NODE_URL \
  --private-key $PRIVATE_KEY \
  --json \
  src/Trustfall.sol:Trustfall \
  --constructor-args "10000000000000000" "$USER_MANAGER" | jq .deployedTo | tr -d '"')

echo "Trustfall.sol: $trustfall";

forge create \
  --rpc-url $NODE_URL \
  --private-key $PRIVATE_KEY \
  --json \
  src/TrustfallNft.sol:TrustfallNFT \
  --constructor-args "TrustFall" "TRUST" $trustfall
