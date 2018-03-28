import web3 from "./web3";

import ERC20_tokenContract from "./build/BreizhCoin.json";

const instance = new web3.eth.Contract(
  JSON.parse(ERC20_tokenContract.interface),
  "0x405Be360E813b293b1B162ab10aba9B2813917D6"
);

export default instance;
