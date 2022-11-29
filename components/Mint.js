import { useState, useEffect} from 'react';

import Wave from '../public/wave.svg';
import {
  getGurtsTotalSupply,
  getGurtsMaxSupply,
  getGurtsPrice,
  getGurtsPrivateSale,
  getGurtsPublicSale,
  getGurtsPassSale,
  getHasMintedPublic,
  getHasMintedWhitelist,
  getIsWhitelisted
} from './etherscomponents/contractFunctions';

export default function Navbar() {
  const [connectedWallet, setConnectedWallet] = useState("");

  const [privateSale, setPrivateSale] = useState(false);
  const [publicSale, setPublicSale] = useState(false);
  const [claimSale, setClaimSale] = useState(false);

  const [maxSupply, setMaxSupply] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [price, setPrice] = useState(0);

  const [hasMintedPublic, setHasMintedPublic] = useState(false);
  const [hasMintedWhitelist, setHasMintedWhitelist] = useState(false);

  const [isWhitelisted, setIsWhitelisted] = useState(false);

  useEffect(() => {
    // checks if ethereum provider is detected
    try{
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        if (typeof provider !== 'undefined') {
            window.ethereum.on('accountsChanged', (accounts) => {
            console.log(`account changed to ${accounts[0]}`);
            setConnectedWallet(accounts[0]);
        })

        window.ethereum.on('chainChanged', (chainId) => {
            console.log(`network changed to ${chainId}. Reloading...`);
            window.location.reload();
        })

        window.ethereum.on('disconnect', (providerRpcError) => {
            console.log('ethereum disconnected', providerRpcError);
            setConnectedWallet("");
        })

        getAccount();
      }
    } catch (err) {
        console.log(err);
        console.log("No ethereum service.");
    }
  },[connectedWallet]);

  useEffect(() => {
    getGurtsTotalSupply().then(response => {
      console.log("Total Supply: ", response);
      setTotalSupply(response);
    }).catch(console.log);

    getGurtsMaxSupply().then(response => {
      console.log("Max Supply: ", response);
      setMaxSupply(response);
    }).catch(console.log);

    getGurtsPrice().then(response => {
      console.log("Gurts Price: ", response);
      setPrice(response);
    }).catch(console.log);

    getGurtsPrivateSale().then(response => {
      console.log("Private Sale: ", response);
      setPrivateSale(response);
    }).catch(console.log);

    getGurtsPublicSale().then(response => {
      console.log("Public Sale: ", response);
      setPublicSale(response);
    }).catch(console.log);

    getGurtsPassSale().then(response => {
      console.log("Pass Sale: ", response);
      setClaimSale(response);
    }).catch(console.log);
  }, [])

  const requestAccount = async () => {
    try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (err) {
        console.log(err);
    }
}

const getAccount = async () => {
  try {
      console.log('ethereum connected');
      let accounts = await window.ethereum.request({ method: "eth_accounts" });
      console.log(`${accounts[0]} connected`);
      setConnectedWallet(accounts[0]);

      getHasMintedPublic(accounts[0]).then(response => {
        setHasMintedPublic(response);
      }).catch(console.log);

      getHasMintedWhitelist(accounts[0]).then(response => {
        setHasMintedWhitelist(response);
      }).catch(console.log);

      getIsWhitelisted(accounts[0]).then(response => {
        setIsWhitelisted(response);
      }).catch(console.log);
  } catch (err) {
      console.log(err);
  }
}

  return (
    <div id="Mint" className="relative h-[1100px] grid grid-cols-1 lg:grid-cols-3">
      <svg className="absolute w-screen h-[1080px] fill-pink-200 z-[1] drop-shadow-[0px_-10px_10px_rgba(0,0,0,0.25)]"><Wave/></svg>
      <div className="relative col-span-1 z-[2]">
          <img src="bgyogurtformint2.png" className="absolute bottom-10 left-16 w-[600px] hidden lg:block"/>
      </div>
      <div className="col-span-2 flex z-[2]">
        <div className="bg-white grow h-[600px] my-0 lg:my-auto mx-10 lg:mx-40 rounded-3xl drop-shadow-xl flex flex-col">
          <img src="strawberry.png" className="absolute w-16 bottom-16 right-16 animate-wiggle"/>
          <div className="text-black mx-auto font-bold text-5xl m-auto animate-bounce">Mint coming soon!</div>
        </div>
      </div>
    </div>
  )
}
  