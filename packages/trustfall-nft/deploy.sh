trustfall=$(forge create \
  --rpc-url $NODE_URL \
  --private-key $PRIVATE_KEY \
  --json \
  src/Trustfall.sol:Trustfall \
  --constructor-args "$(cast wallet address --private-key $PRIVATE_KEY)" "1000000000000000" "$USER_MANAGER" | jq .deployedTo | tr -d '"')

echo "Trustfall.sol: $trustfall";

####################################################
#     CYAN
####################################################

cyan=$(forge create \
  --rpc-url $NODE_URL \
  --private-key $PRIVATE_KEY \
  --json \
  src/Cmyk.sol:CMYK | jq .deployedTo | tr -d '"')

echo "Cyan: $cyan";

cast send \
  --rpc-url $NODE_URL \
  --private-key $PRIVATE_KEY \
  $cyan \
  "__CMYK_init(string,string,string)" \
  "Trustfall CMYK Cyan" "cmykCYAN" "Cyan"
  
####################################################
#    MAGENTA 
####################################################

magenta=$(forge create \
  --rpc-url $NODE_URL \
  --private-key $PRIVATE_KEY \
  --json \
  src/Cmyk.sol:CMYK | jq .deployedTo | tr -d '"')

echo "Magenta: $magenta";

cast send \
  --rpc-url $NODE_URL \
  --private-key $PRIVATE_KEY \
  $magenta \
  "__CMYK_init(string,string,string)" \
  "Trustfall CMYK Magenta" "cmykMAGENTA" "Magenta"


####################################################
#    YELLOW 
####################################################

yellow=$(forge create \
  --rpc-url $NODE_URL \
  --private-key $PRIVATE_KEY \
  --json \
  src/Cmyk.sol:CMYK | jq .deployedTo | tr -d '"')

echo "Yellow: $yellow";

cast send \
  --rpc-url $NODE_URL \
  --private-key $PRIVATE_KEY \
  $yellow \
  "__CMYK_init(string,string,string)" \
  "Trustfall CMYK Yellow" "cmykYELLOW" "Yellow"

####################################################
#    BLACK 
####################################################

black=$(forge create \
  --rpc-url $NODE_URL \
  --private-key $PRIVATE_KEY \
  --json \
  src/Cmyk.sol:CMYK | jq .deployedTo | tr -d '"')

echo "Black: $black";

cast send \
  --rpc-url $NODE_URL \
  --private-key $PRIVATE_KEY \
  $black \
  "__CMYK_init(string,string,string)" \
  "Trustfall CMYK Black" "cmykBLACK" "Black"
  
####################################################
#    SETUP 
####################################################

cast send --rpc-url $NODE_URL --private-key $PRIVATE_KEY $trustfall "setIsCmyk(address,bool)" $cyan true
cast send --rpc-url $NODE_URL --private-key $PRIVATE_KEY $trustfall "setIsCmyk(address,bool)" $magenta true
cast send --rpc-url $NODE_URL --private-key $PRIVATE_KEY $trustfall "setIsCmyk(address,bool)" $yellow true
cast send --rpc-url $NODE_URL --private-key $PRIVATE_KEY $trustfall "setIsCmyk(address,bool)" $black true

cast send --private-key $PRIVATE_KEY --rpc-url $NODE_URL $cyan "setTrustfall(address)" $trustfall 
cast send --private-key $PRIVATE_KEY --rpc-url $NODE_URL $magenta "setTrustfall(address)" $trustfall 
cast send --private-key $PRIVATE_KEY --rpc-url $NODE_URL $yellow "setTrustfall(address)" $trustfall 
cast send --private-key $PRIVATE_KEY --rpc-url $NODE_URL $black "setTrustfall(address)" $trustfall 

cast send --private-key $PRIVATE_KEY --rpc-url $NODE_URL $cyan "setURI(string)" "ipfs://QmTwE7aD1hgndwoTXLBqyiUUbmsvsTw4Tq3J9oHQDNHijW"
cast send --private-key $PRIVATE_KEY --rpc-url $NODE_URL $magenta "setURI(string)" "ipfs:/QmUXPg3Q3RJ1fbiqdXBRx4wzo5vKgofu7EDik8nHSQkKhA" 
cast send --private-key $PRIVATE_KEY --rpc-url $NODE_URL $yellow "setURI(string)" "ipfs://QmTc6sikdJSiMUuxJUvcyK7Prae3zA8b9vHNUME1kk9VhZ"
cast send --private-key $PRIVATE_KEY --rpc-url $NODE_URL $black "setURI(string)" "ipfs://QmQuKpvAUiMU8CEuJEjzKVG5HKUabMdptjtifxKhwy1V6V"

####################################################
#   OUTPUT 
####################################################

echo "";
echo "Deployment complete:";
echo "";
echo "Trustfall: $trustfall";
echo "";
echo "Team NFTS";
echo "Cyan: $cyan";
echo "Magenta: $magenta";
echo "Yellow: $yellow";
echo "Black: $black";
echo "";
