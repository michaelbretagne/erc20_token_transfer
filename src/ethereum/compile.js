const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

// Get folder
const buildPath = path.resolve(__dirname, "build");
// Remove build folder files
fs.removeSync(buildPath);

// Get file
const erc20_tokenPath = path.resolve(__dirname, "contract", "ERC20_token.sol");
// Read file
const source = fs.readFileSync(erc20_tokenPath, "utf8");
// Get solidity compiled output
const output = solc.compile(source, 1).contracts;

// Create build folder
fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
