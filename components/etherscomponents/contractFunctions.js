import { ethers } from "ethers";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import gurtsAbi from './gurtsAbi.json';
import stakeAbi from './stakeAbi.json';
import { gurtsContract, stakeContract, lowerAddresses } from "./config";

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
        resolve(parseInt(price.toString()));
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

export const getIsWhitelisted = (address) => {
    return lowerAddresses.includes(address.toLowerCase());
}



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

export const getTotalStaked = () => new Promise(async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

        let amountStaked = await contract.balanceOf(stakeContract);
        resolve(amountStaked.toString());
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

export const getUserTokensStaked = (address) => new Promise (async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(stakeContract, stakeAbi, signer);
        
        let stakedTokens = await contract.addressTokens(address);
        let newArray = stakedTokens.map(element => parseInt(element.toString()))
        resolve(newArray);
    } catch(err) {
        reject(err);
    }
})

export const getUserStakePoints = (address) => new Promise (async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(stakeContract, stakeAbi, signer);
        
        let points = await contract.stakePoints(address);
        resolve(points.toString());
    } catch(err) {
        reject(err);
    }
})

export const getTokenInfo = (tokenId) => new Promise (async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(stakeContract, stakeAbi, signer);
        
        let info = await contract.tokenInfo(tokenId);
        let newArray = info.map(element => element.toString())
        resolve(newArray);
    } catch(err) {
        reject(err);
    }
})

export const depositGurts = (tokenIds) => new Promise (async (resolve, reject) => {
    try {
        console.log("Depositing: ", tokenIds);
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(stakeContract, stakeAbi, signer);
    
    
        resolve(await contract.deposit(tokenIds));
    } catch(err) {
        reject(err);
    }
})

export const withdrawGurts = (tokenIds) => new Promise (async (resolve, reject) => {
    try {
        console.log("Withdrawing: ", tokenIds);
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(stakeContract, stakeAbi, signer);

        resolve(await contract.withdraw(tokenIds));
    } catch(err) {
        reject(err);
    }
})

export const getApprovedStatus = (address) => new Promise (async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);
        
        let status = await contract.isApprovedForAll(address, stakeContract);
        resolve(status);
    } catch(err) {
        reject(err);
    }
})

export const approveStakeContract = () => new Promise (async (resolve, reject) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(gurtsContract, gurtsAbi, signer);

        resolve(await contract.setApprovalForAll(stakeContract, true));
    } catch(err) {
        reject(err);
    }
})