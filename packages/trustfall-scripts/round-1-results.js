const transaction = {
  version: "1.0",
  chainId: "42161",
  createdAt: 1660753651447,
  meta: {
    name: "Transactions Batch",
    description: "",
    txBuilderVersion: "1.9.0",
    createdFromSafeAddress: "0x3eC6b20F101c98E4E9509C2f2C3F5a09cB998Fb3",
    createdFromOwnerAddress: "",
    checksum:
      "0x5a8aa68c11ac6a036c942e93f7b9bda865acd5d1acea43423c5409412c6e92ca",
  },
  transactions: [,],
};

const callTemplate = {
  to: "0xb71F3D4342AaE0b8D531E14D2CF2F45d6e458A5F",
  value: "0",
  data: null,
  contractMethod: {
    inputs: [
      { internalType: "address", name: "borrower_", type: "address" },
      { internalType: "uint256", name: "trustAmount", type: "uint256" },
    ],
    name: "updateTrust",
    payable: false,
  },
  contractInputsValues: {
    borrower_: "<VALUE>",
    trustAmount: "<VALUE>",
  },
};
