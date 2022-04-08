import Web3 from "web3";
import { provider } from "web3-core";

export const getLibrary = (provider: provider) => {
  return new Web3(provider);
};
