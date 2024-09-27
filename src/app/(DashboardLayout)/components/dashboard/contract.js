import Web3 from "web3";
import ABI from "./ABI.json";

let web3;
let contract;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  web3 = new Web3(window.ethereum);
  const contractAddress = "0xc358A866f1E49698FD2b65c30f3dcfc42eAb337a"; // Replace with your contract address
  contract = new web3.eth.Contract(ABI, contractAddress);
} else {
  console.log('Ethereum wallet not detected. Please install MetaMask or another wallet.');
}

export { web3, contract };
