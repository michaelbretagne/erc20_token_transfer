const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledContract = require("../src/ethereum/build/BreizhCoin.json");

let accounts;
let tokenContract;
let balance;

beforeEach(async () => {
  // Get account that will be use to create the contract
  accounts = await web3.eth.getAccounts();

  // Deploy contract. Arguments(initSupply, maxSupply, freeTokensPerAddress)
  tokenContract = await new web3.eth.Contract(
    JSON.parse(compiledContract.interface)
  )
    .deploy({ data: compiledContract.bytecode, arguments: [1000, 1199, 100] })
    .send({ from: accounts[0], gas: "1000000" });
  // Get balance
  balance = await tokenContract.methods.balanceOf(accounts[0]).call();
  balance = parseInt(balance);
});

describe("ERC20 token contract", () => {
  it("deploys a contract", () => {
    assert.ok(tokenContract.options.address);
  });

  it("it return the correct balance", async () => {
    assert.equal(balance, 1000);
  });

  it("marks caller as the contract manager", async () => {
    const manager = await tokenContract.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it("check the maxSupply", async () => {
    const maxSupply = await tokenContract.methods.maximumSupply().call();
    assert.equal(maxSupply, 1199);
  });

  it("it get free tokens", async () => {
    await tokenContract.methods.getFreeToken().send({ from: accounts[0] });

    let newBalance = await tokenContract.methods.balanceOf(accounts[0]).call();
    newBalance = parseInt(newBalance);
    assert.equal(newBalance, 1100);
  });
});
