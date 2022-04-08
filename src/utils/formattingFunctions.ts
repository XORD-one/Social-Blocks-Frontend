import Web3 from "web3";

export const conciseWalletAddress = (address: string) => {
  if (Web3.utils.isAddress(address)) {
    return `${address.slice(0, 7)}.....${address.slice(
      address.length - 5,
      address.length
    )}`;
  }
  return "-";
};

export const conciseAddress = (address: string, n: number) => {
  if (Web3.utils.isAddress(address)) {
    return `${address.slice(0, n)}.....${address.slice(
      address.length - (n - 2),
      address.length
    )}`;
  }
  return "-";
};
