const fs = require("fs");
const path = require("path");

const baseTransaction = {
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
  transactions: [],
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

function main() {
  const totalPrize = 2000; // $2,000

  // Parse score data
  const resultPath = path.resolve(__dirname, "./round-1-results.json");
  const resultContent = fs.readFileSync(resultPath, "utf8");
  const result = JSON.parse(resultContent);
  const sorted = result.sort((a, b) => Number(b.score) - a.score);

  // Get sum of all scores
  const scoreSum = result.reduce((acc, x) => acc + x.score, 0);

  // Parse values for transactions
  const values = sorted
    .filter((x) => x.score > 0)
    .map((x) => ({
      borrower_: x.address,
      trustAmount: Math.ceil((x.score / Number(scoreSum)) * totalPrize),
    }))
    .map((x) => ({ ...x, trustAmount: x.trustAmount < 1 ? 1 : x.trustAmount }));

  console.log("[*] Scores:", values.length);

  // Total trust amount
  const trustSum = values.reduce((acc, x) => x.trustAmount + acc, 0);
  console.log("[*] Trust sum:", trustSum);

  // Create transaction objects
  const transactions = values.map((x) => ({
    ...callTemplate,
    contractInputsValues: {
      borrower_: x.borrower_,
      trustAmount: String(x.trustAmount * 10 ** 18),
    },
  }));

  // Create and save transaction
  const transaction = { ...baseTransaction, transactions };
  const savePath = "./round-1-results-transaction.json";
  fs.writeFileSync(savePath, JSON.stringify(transaction));
  console.log("[*] Transaction saved to:", savePath);
}

main();
