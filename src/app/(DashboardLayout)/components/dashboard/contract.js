// contract.js
import Web3 from "web3";
import ABI from "./ABI.json";

const web3 = new Web3(window.ethereum);
const contractAddress = "0xc358A866f1E49698FD2b65c30f3dcfc42eAb337a"; // Replace with your contract address

const contract = new web3.eth.Contract(ABI, contractAddress);

export { web3, contract };
