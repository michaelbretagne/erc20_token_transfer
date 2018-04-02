import web3 from "./web3";

import ERC20_tokenContract from "./build/BreizhCoin.json";

const instance = new web3.eth.Contract(
  JSON.parse(ERC20_tokenContract.interface),
  "0x1E86A5F0db6a54F6742C129ac3a8880A0083391a"
);

export default instance;
