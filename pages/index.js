import React, { useState } from 'react';
import Head from 'next/head'
import { addresses, contractAddress } from "../components/config";
import { ethers } from "ethers";
import abi from '../components/abi.json'
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256');

let selectedAccount;
let nftContract;
let isInitialized = false;

const initWeb3 = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();

    nftContract = new ethers.Contract(contractAddress, abi, signer);

    isInitialized = true;
}

async function requestAccount() {
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

async function getAccount() {
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

const mintPublic = async () => {
  if (!isInitialized) {
    await initWeb3();
  }
  return nftContract.publicMint();
};

const mintPrivate = async (proof) => {
  if (!isInitialized) {
    await initWeb3();
  }
  return nftContract.whitelistMint(proof);
};

const checkPrivateSale = async () => {
  if (!isInitialized) {
      await initWeb3();
  }
  let isPaused = await nftContract.privateSale();
  return isPaused;
};

const checkPublicSale = async () => {
  if (!isInitialized) {
      await initWeb3();
  }
  let isPaused = await nftContract.publicSale();
  return isPaused;
};

const checkSupply = async () => {
  if (!isInitialized) {
      await initWeb3();
  }
  let maxSupply = await nftContract.maxSupply();
  let totalSupply = await nftContract.totalSupply();
  return [totalSupply, maxSupply];
};

const checkBalanceOf = async (address) => {
  if (!isInitialized) {
      await initWeb3();
  }
  return await nftContract.balanceOf(address);
};

export default function Home() {
  const [walletAddress, setWalletAddress] = useState();
  const [proof, setProof] = useState([]);
  const [privateSale, setPrivateSale] = useState();
  const [publicSale, setPublicSale] = useState();
  const [supply, setSupply] = useState("");
  const [maxSupply, setMaxSupply] = useState("");
  const [displaySupply, setDisplaySupply] = useState("");
  const [balanceOfOwner, setBalanceOfOwner] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (typeof window !== 'undefined') {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    if (typeof provider !== 'undefined') {
      window.ethereum.on('accountsChanged', function (accounts){
        let selectedAccount = accounts[0];
        console.log(`Selected account changed to ${selectedAccount}`);
        updateConnected();
      })
      window.ethereum.on('chainChanged', function(network){
        console.log(`Selected network changed to ${network}`);
        window.location.reload();
    })
      
    }
  }

  const updateConnected = () => {
    requestAccount().then(value => {
      getAccount().then(value => {
        setWalletAddress(value);
        getPrivateSaleStatus();
        getPublicSaleStatus();
        getSupply();
        getProof(value);
        getBalanceOfAddress(value);
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  const getPrivateSaleStatus = () => {
    checkPrivateSale().then(value => {
      console.log(`private sale is ${value}`);
      setPrivateSale(value);
    }).catch((err) => {
      console.log(err);
    })
  }

  const getPublicSaleStatus = () => {
    checkPublicSale().then(value => {
      console.log(`public sale is ${value}`);
      setPublicSale(value);
    }).catch((err) => {
      console.log(err);
    })
  }

  const getSupply = () => {
    checkSupply().then(value => {
      let totalSupply = value[0];
      let maxSupply = value[1];
      console.log(`${totalSupply}/${maxSupply} minted`)
      setDisplaySupply(`${totalSupply}/${maxSupply}`);
      setSupply(value);
    }).catch((err) => {
      console.log(err);
    })
  }

  const getBalanceOfAddress = (address) => {
    checkBalanceOf(address).then(value => {
      setBalanceOfOwner(value);
      console.log(`address owns ${value.toString()} pass(s)`);
    }).catch((err) => {
      console.log(err);
    })
  }

  const mint = () => {
    updateConnected();
    if (supply >= maxSupply) {
      console.log("Minted out");
      setErrorMessage("Minted out");
    } else if (balanceOfOwner > 0) {
      console.log("Already minted");
      setErrorMessage("Already minted");
    } else if (publicSale) {
      console.log("Minting public");
      setErrorMessage("Minting public...");
      mintPublic().then(tx => {
        console.log(tx);
        setErrorMessage("Minted");
      })
      .catch((err) => {
        console.log(err);
      })
    } else if (privateSale && proof.length > 0 ) {
      console.log("Minting private");
      setErrorMessage("Minting whitelist...");
      mintPrivate(proof).then(tx => {
        console.log(tx);
        setErrorMessage("Minted");
      })
      .catch((err) => {
        console.log(err);
      })
    } else if (privateSale) {
      console.log("Not witelisted");
      setErrorMessage("Not whitelisted");
    } else {
      console.log("Not live");
      setErrorMessage("Not live");
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
      <Head>
        <title>Yogurt Land</title>
      </Head>
      <div className="m-auto grid">
        <h1 className="text-5xl font-bold pb-5 m-auto">Yogurt Land</h1>
        <h1 className="m-auto pb-5">{displaySupply}</h1>
        <button onClick={walletAddress === undefined ? updateConnected : mint} className={walletAddress === undefined ? "m-auto bg-red-500 px-5 py-1 rounded-full text-xl drop-shadow-[0px_7px_0px_rgba(0,0,0,1)] transition-all hover:bg-red-400 hover:translate-y-[2px] hover:drop-shadow-[0px_3px_0px_rgba(0,0,0,1)]" : "m-auto bg-green-500 px-5 py-1 rounded-full text-xl drop-shadow-[0px_7px_0px_rgba(0,0,0,1)] transition-all hover:bg-green-400 hover:translate-y-[2px] hover:drop-shadow-[0px_3px_0px_rgba(0,0,0,1)]"}>
          <div className={walletAddress === undefined ? "hidden" : "block"}>Mint</div>
          <div className={walletAddress === undefined ? "block" : "hidden"}>Connect</div>
        </button>
        <div className="m-auto pt-5">
          <a href={`https://etherscan.io/address/${contractAddress}`} className="text-lg font-bold underline decoration-3 transition-all hover:text-gray-300">Contract</a>
        </div>
        <h1 className="m-auto pt-5 text-slate-400">{errorMessage}</h1>
      </div>
    </div>
  )
}
