const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledContract = require("./build/BreizhCoin.json");

const provider = new HDWalletProvider(
  "comic talent heart bamboo chalk define ancient jewel wire dry strategy effort",
  "https://rinkeby.infura.io/04TZagwwylYxLoXeoY6u"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledContract.bytecode })
    .send({ gas: 1000000, from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};

deploy();
