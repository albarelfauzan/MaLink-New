import Web3 from "web3";
import ABI from "./ABI.json";

// Tentukan tipe untuk web3 dan contract
let web3: Web3 | undefined;
let contract: Web3.eth.Contract | undefined; // This should be fine as long as you have the right import

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    const contractAddress = "0xc358A866f1E49698FD2b65c30f3dcfc42eAb337a"; // Replace with your contract address
    contract = new (web3 as any).eth.Contract(ABI, contractAddress); // Cast web3 to any to avoid type issues
} else {
    console.log('Ethereum wallet not detected. Please install MetaMask or another wallet.');
}

export { web3, contract };
