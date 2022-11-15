import { ethers } from "ethers";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import gurtsAbi from './gurtsAbi.json';
import stakeAbi from './stakeAbi.json';
import { gurtsContract, stakeContract, lowerAddresses } from "./config";

export const gurtsTotalSupply = new Promise(async resolve => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

        let supply = await contract.totalSupply();
        resolve(supply.toString());
    } catch(err) {
        console.log(err);
        resolve(false);
    }
});