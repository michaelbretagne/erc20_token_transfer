const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledContract = require("./build/BreizhCoin.json");
const { mnemonic, infuraUrl } = require("../api_keys/keys");

const provider = new HDWalletProvider(mnemonic, infuraUrl);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  // Deploy contract. Arguments(initSupply, maxSupply, freeTokensPerAddress)
  const result = await new web3.eth.Contract(
    JSON.parse(compiledContract.interface)
  )
    .deploy({
      data: compiledContract.bytecode,
      arguments: [1000000, 2000000, 1000]
    })
    .send({ gas: 1000000, from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};

deploy();
