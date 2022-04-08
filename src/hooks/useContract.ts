import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import Web3 from "web3";

import { useAppSelector } from ".";
import { CONTRACT_ADDRESS } from "../contract/constants";
import contractAbi from "../contract/contractAbi.json";

const useContract = () => {
  const contractInstance = useAppSelector(
    (state) => state.contractReducer.instance
  );
  const dispatch = useDispatch();
  const web3React = useWeb3React();

  if (contractInstance) {
    return contractInstance;
  }

  const web3 = new Web3(web3React.library.currentProvider);

  const contract = new web3.eth.Contract(contractAbi as any, CONTRACT_ADDRESS);

  dispatch({
    type: "SET_INSTANCE",
    payload: contract,
  });

  return contract;
};

export default useContract;
