import { ethers } from "ethers";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

import yogurtverseAbi from './yogurtverseAbi.json';
import gurtsAbi from './gurtsAbi.json';

import { yogurtverseContract, gurtsContract, lowerAddresses } from "./config";

export const genProof = (address) => new Promise(async (resolve, reject) => {
    try {
    let leafNodes = lowerAddresses.map(addr => keccak256(addr));
    let merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
    let index = lowerAddresses.indexOf(address.toLowerCase());

    if (index != -1) {
        let keccakAddress = leafNodes[index];
        let hexProof = merkleTree.getHexProof(keccakAddress);
        resolve(hexProof);
    } else {
        reject(`No proof for ${address}.`)
    }
    } catch (err) {
        reject(err);
    }
});

export const getYGBalance = (address) => new Promise(async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(yogurtverseContract, yogurtverseAbi, signer);

        let balance = await contract.balanceOf(address);
        resolve(parseInt(balance.toString()));
    } catch(err) {
        reject(err);
    }
});

export const getGurtsTotalSupply = () => new Promise(async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

        let supply = await contract.totalSupply();
        resolve(parseInt(supply.toString()));
    } catch(err) {
        reject(err);
    }
});

export const getGurtsMaxSupply = () => new Promise(async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

        let supply = await contract.maxSupply();
        resolve(parseInt(supply.toString()));
    } catch(err) {
        reject(err);
    }
});

export const getGurtsPrice = () => new Promise(async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

        let price = await contract.price();
        resolve(price);
    } catch(err) {
        reject(err);
    }
});

export const getGurtsPrivateSale = () => new Promise(async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

        let status = await contract.privateSale();
        resolve(status);
    } catch(err) {
        reject(err);
    }
});

export const getGurtsPublicSale = () => new Promise(async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

        let status = await contract.publicSale();
        resolve(status);
    } catch(err) {
        reject(err);
    }
});

export const getGurtsPassSale = () => new Promise(async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

        let status = await contract.claimSale();
        resolve(status);
    } catch(err) {
        reject(err);
    }
});

export const getHasMintedPublic = (address) => new Promise(async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

        let status = await contract.hasMintedPublic(address);
        resolve(status);
    } catch(err) {
        reject(err);
    }
});

export const getHasMintedWhitelist = (address) => new Promise(async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

        let status = await contract.hasMintedWhitelist(address);
        resolve(status);
    } catch(err) {
        reject(err);
    }
});

export const getIsWhitelisted = (address) => new Promise(async (resolve, reject) => {
    try {
        resolve(lowerAddresses.includes(address.toLowerCase()));
    } catch (err) {
        reject(err);
    }
});



export const mintPublic = () => new Promise(async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

        let price = await getGurtsPrice();

        let status = await contract.publicMint({value: price.toString()});
        status.wait(1).then(response => {
            resolve(response);
        });
    } catch(err) {
        reject(err);
    }
});

export const mintWhitelist = (proof) => new Promise(async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

        let price = await getGurtsPrice();

        let status = await contract.whitelistMint(proof, {value: price.toString()});
        status.wait(1).then(response => {
            resolve(response);
        });
    } catch(err) {
        reject(err);
    }
});

export const mintWithPass = (tokenIds) => new Promise(async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

        let status = await contract.passMint(tokenIds);
        status.wait(1).then(response => {
            resolve(response);
        });
    } catch(err) {
        reject(err);
    }
});



export const checkIfClaimed = (tokenId) => new Promise(async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

        let status = await contract.passHasClaimed(tokenId);
        resolve(status);
    } catch(err) {
        reject(err);
    }
});

export const checkPassWLMinted = (tokenId) => new Promise(async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

        let status = await contract.passWLMinted(tokenId);
        resolve(parseInt(status.toString()));
    } catch(err) {
        reject(err);
    }
});


export const getbaseUri = () => new Promise(async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

        let baseURI = await contract.baseURI();
        resolve(baseURI.toString());
    } catch(err) {
        reject(err);
    }
});

export const getUserTokensGurts = (address) => new Promise (async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

        let userTokens = await contract.tokensOfOwner(address);
        let newArray = userTokens.map(element => parseInt(element.toString()))
        resolve(newArray);
    } catch(err) {
        reject(err);
    }
})