import { ethers } from "ethers";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import gurtsAbi from './gurtsAbi.json';
import stakeAbi from './stakeAbi.json';
import { gurtsContract, stakeContract, lowerAddresses } from "./config";

export const getGurtsTotalSupply = () => new Promise(async resolve => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

    let supply = await contract.totalSupply();
    resolve(supply.toString());
});

export const getbaseUri = () => new Promise(async resolve => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

    let baseURI = await contract.baseURI();
    resolve(baseURI.toString());
});

export const getTotalStaked = () => new Promise(async resolve => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

    let amountStaked = await contract.balanceOf(stakeContract);
    resolve(amountStaked.toString());
});

export const getUserTokensGurts = (address) => new Promise (async resolve => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);
    
    let userTokens = await contract.tokensOfOwner(address);
    let newArray = userTokens.map(element => parseInt(element.toString()))
    resolve(newArray);
})

export const getUserTokensStaked = (address) => new Promise (async resolve => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let contract = new ethers.Contract(stakeContract, stakeAbi, signer);
    
    let stakedTokens = await contract.addressTokens(address);
    let newArray = stakedTokens.map(element => parseInt(element.toString()))
    resolve(newArray);
})

export const getUserStakePoints = (address) => new Promise (async resolve => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let contract = new ethers.Contract(stakeContract, stakeAbi, signer);
    
    let points = await contract.stakePoints(address);
    resolve(points.toString());
})

export const getTokenInfo = (tokenId) => new Promise (async resolve => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let contract = new ethers.Contract(stakeContract, stakeAbi, signer);
    
    let info = await contract.tokenInfo(tokenId);
    let newArray = info.map(element => element.toString())
    resolve(newArray);
})

export const depositGurts = (tokenIds) => new Promise (async resolve => {
    console.log(tokenIds);
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let contract = new ethers.Contract(stakeContract, stakeAbi, signer);
    
    try {
        resolve(await contract.deposit(tokenIds));
    } catch(err) {
        console.log(err);
    }
})

export const withdrawGurts = (tokenIds) => new Promise (async resolve => {
    console.log(tokenIds);
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let contract = new ethers.Contract(stakeContract, stakeAbi, signer);

    try {
        resolve(await contract.withdraw(tokenIds));
    } catch(err) {
        console.log(err);
    }
})