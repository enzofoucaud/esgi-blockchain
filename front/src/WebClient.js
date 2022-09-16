import Web3 from 'web3';
import { ContractABI } from './ABI';

let myAccount;

export const initWeb3 = async () => {
  let provider = window.ethereum;

  if (typeof provider !== "undefined") {
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        console.log(accounts);
      })
      .catch((err) => {
        console.log(err);
      });
    window.ethereum.on("accountsChanged", (accounts) => {
      myAccount = accounts[0];
      console.log("Account is now: ",accounts);
    });
    const web3 = new Web3(provider);
    const networkID = await web3.eth.net.getChainId();
    const myContract = new web3.eth.Contract(ContractABI, '0x5A575507b80Ef44AD54d5C4b99b6276cf0c7EE4f');
    console.log(myContract);
  }
};
