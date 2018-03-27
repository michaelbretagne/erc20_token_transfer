import web3 from "./web3";
import ContractToken from "./build/BreizhCoin.json";

export default address => {
  return new web3.eth.Contract(JSON.parse(BreizhCoin.interface), address);
};
