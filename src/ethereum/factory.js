import web3 from "./web3";

import ERC20_tokenContract from "./build/BreizhCoin.json";

const instance = new web3.eth.Contract(
  JSON.parse(ERC20_tokenContract.interface),
  "0x64fFD34716711f068c5c5974d1e71d021aEf024A"
);

export default instance;
