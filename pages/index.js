import React, { useState } from 'react';
import { addresses } from "../components/addresses";
import { ethers } from "ethers";
import abi from '../components/abi.json'
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256');

const contractAddress = "";
let selectedAccount;
let nftContract;
let isInitialized = false;

export const initWeb3 = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();

    nftContract = new ethers.Contract(contractAddress, abi, signer);

    isInitialized = true;
}

export async function requestAccount() {
  if (window.ethereum) {
      try {
          const accounts = await window.ethereum.request({
              method: "eth_requestAccounts"
          });
          selectedAccount = accounts[0];
          return accounts[0];
      } catch (error) {
      }
  } else {
  }
}

export async function getAccount() {
  if (window.ethereum) {
      console.log("Wallet detected");
      try {
          const accounts = await window.ethereum.request({
              method: "eth_accounts"
          });
          selectedAccount = accounts[0];
          console.log(selectedAccount, "Is connected");
          return accounts[0];
      } catch (error) {
          console.log("Error connecting...");
      }
  } else {
      console.log("No wallet detected");
  }
}

export const mintPublic = async () => {
  if (!isInitialized) {
    await initWeb3();
  }
  return nftContract.publicMint();
};

export const mintPrivate = async (proof) => {
  if (!isInitialized) {
    await initWeb3();
  }
  return nftContract.whitelistMint(proof);
};

export const checkPrivateSale = async () => {
  if (!isInitialized) {
      await initWeb3();
  }
  let isPaused = await nftContract.privateSale();
  return isPaused;
};

export const checkPublicSale = async () => {
  if (!isInitialized) {
      await initWeb3();
  }
  let isPaused = await nftContract.publicSale();
  return isPaused;
};

export const checkSupply = async () => {
  if (!isInitialized) {
      await initWeb3();
  }
  let maxSupply = await nftContract.maxSupply();
  let totalSupply = await nftContract.totalSupply();
  return `${totalSupply}/${maxSupply}`;
};

export default function Home() {
  const [walletAddress, setWalletAddress] = useState();
  const [proof, setProof] = useState([]);
  const [privateSale, setPrivateSale] = useState();
  const [publicSale, setPublicSale] = useState();
  const [supply, setSupply] = useState("");

  const updateConnected = () => {
    requestAccount().then(value => {
      getAccount().then(value => {
        setWalletAddress(`${value} is connected`);
        console.log(`${value} is connected`);
        getPrivateSaleStatus();
        getPublicSaleStatus();
        getSupply();
        getProof(value);
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  const getPrivateSaleStatus = () => {
    checkPrivateSale().then(value => {
      setPrivateSale(value);
    }).catch((err) => {
      console.log(err);
    })
  }

  const getPublicSaleStatus = () => {
    checkPublicSale().then(value => {
      setPublicSale(value);
    }).catch((err) => {
      console.log(err);
    })
  }

  const getSupply = () => {
    checkSupply().then(value => {
      setSupply(value);
    }).catch((err) => {
      console.log(err);
    })
  }

  const mint = () => {
    if (publicSale) {
      console.log("Minting public");
      mintPublic().then(tx => {
        console.log(tx);
      })
      .catch((err) => {
        console.log(err);
      })
    } else if (privateSale) {
      console.log("Minting private");
      mintPrivate(proof).then(tx => {
        console.log(tx);
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      console.log("Not live");
    }
  }

  const leafNodes = addresses.map(addr => keccak256(addr));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});

  function getProof(address) {
    console.log("getting proof");
    const check = addresses.findIndex(element => element == address);
    if (check > -1) {
        const addressIndex = leafNodes[check];
        const hexProof = merkleTree.getHexProof(addressIndex);
        setProof(hexProof);
        console.log(`${hexProof} is your proof`);
        return;
    }
    console.log("no proof");
}

  return (
    <div className="flex justify-center h-screen bg-slate-900">
      <div className="m-auto grid">
        <h1 className="text-5xl font-bold pb-5 m-auto">Yogurt Land</h1>
        <h1 className="m-auto pb-5">{supply}</h1>
        <button onClick={walletAddress === undefined ? updateConnected : mint} className={walletAddress === undefined ? "m-auto bg-red-500 px-5 py-1 rounded-full text-xl drop-shadow-[0px_7px_0px_rgba(0,0,0,1)] transition-all hover:bg-red-400 hover:translate-y-[2px] hover:drop-shadow-[0px_3px_0px_rgba(0,0,0,1)]" : "m-auto bg-green-500 px-5 py-1 rounded-full text-xl drop-shadow-[0px_7px_0px_rgba(0,0,0,1)] transition-all hover:bg-green-400 hover:translate-y-[2px] hover:drop-shadow-[0px_3px_0px_rgba(0,0,0,1)]"}>
          <div className={walletAddress === undefined ? "hidden" : "block"}>Mint</div>
          <div className={walletAddress === undefined ? "block" : "hidden"}>Connect</div>
        </button>
        <div className="m-auto pt-5">
          <a href="" className="text-lg font-bold underline decoration-3 transition-all hover:text-gray-300"> Contract</a>
        </div>
      </div>
    </div>
  )
}
