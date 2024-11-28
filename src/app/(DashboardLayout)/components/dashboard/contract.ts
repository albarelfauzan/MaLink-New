import Web3 from "web3";
import ABI from "./ABI.json";

// Tentukan tipe untuk web3 dan contract
let web3: Web3 | undefined;
let contract: any; // Ubah menjadi any untuk menghindari error tipe

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    const contractAddress = "0xd0702DE2cB79c4e5588107452a057D50E6DB82Bc"; // Ganti dengan alamat kontrak Anda
    contract = new (web3 as any).eth.Contract(ABI, contractAddress); // Cast web3 ke any untuk menghindari masalah tipe
} else {
    console.log('Ethereum wallet not detected. Please install MetaMask or another wallet.');
}

export { web3, contract };
