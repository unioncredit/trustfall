trustfall=$(forge create \
  --rpc-url $NODE_URL \
  --private-key $PRIVATE_KEY \
  --json \
  src/Trustfall.sol:Trustfall \
  --constructor-args "$(cast wallet address --private-key $PRIVATE_KEY)" "10000000000000000" "$USER_MANAGER" | jq .deployedTo | tr -d '"')

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
  $yellow \
  "__CMYK_init(string,string,string)" \
  "Trustfall CMYK Black" "cmykBLACK" "Black"

cast send --rpc-url $NODE_URL --private-key $PRIVATE_KEY \
  $trustfall "setIsCmyk(address,bool)" $cyan true

cast send --rpc-url $NODE_URL --private-key $PRIVATE_KEY \
  $trustfall "setIsCmyk(address,bool)" $magenta true

cast send --rpc-url $NODE_URL --private-key $PRIVATE_KEY \
  $trustfall "setIsCmyk(address,bool)" $yellow true

cast send --rpc-url $NODE_URL --private-key $PRIVATE_KEY \
  $trustfall "setIsCmyk(address,bool)" $black true


echo $trustfall;
echo $cyan;
echo $magenta;
echo $yellow;
echo $black;
