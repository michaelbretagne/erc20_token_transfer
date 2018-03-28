import Web3 from "web3";
import { infuraUrl } from "../api_keys/keys";

let web3;

// We are in the browser and metamask is running
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  web3 = new Web3(window.web3.currentProvider);
} else {
  // We are on the server or the user is not running metamask
  const provider = new Web3.providers.HttpProvider(infuraUrl);
  web3 = new Web3(provider);
}

export default web3;
