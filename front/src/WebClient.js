import Web3 from "web3";
import { ContractABI } from "./ABI";

let selectedAccount;
let nftContract;
let isInitialized = false;

export const initWeb3 = async () => {
  let provider = window.ethereum;
  if (typeof provider !== "undefined") {
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log(`Selected account is ${selectedAccount}`);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
    window.ethereum.on("accountsChanged", function (accounts) {
      selectedAccount = accounts[0];
      console.log(`Selected account changed to ${selectedAccount}`);
    });
  }
  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  nftContract = new web3.eth.Contract(
    ContractABI,
    NFTContractBuild.networks[networkId].address
  );
  isInitialized = true;
};

export const createOrder = async () => {
  if (!isInitialized) {
    await init();
  }
  return nftContract.methods
    .createOrder(2,"0x5A575507b80Ef44AD54d5C4b99b6276cf0c7EE4f", 1663333232)
    .send({ from: selectedAccount });
};
