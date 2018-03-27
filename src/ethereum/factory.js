import web3 from "./web3";

import ERC20_tokenContract from "./build/BreizhCoin.json";

const instance = new web3.eth.Contract(
  JSON.parse(ERC20_tokenContract.interface),
  "0x5f9ade1a94c399636c877cff4b29876311304497"
);

export default instance;
