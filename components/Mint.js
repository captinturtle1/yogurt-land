import { ethers } from 'ethers';
import { useState, useEffect} from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import Wave from '../public/wave.svg';
import {
  getYGBalance,
  getGurtsTotalSupply,
  getGurtsMaxSupply,
  getGurtsPrice,
  getGurtsPrivateSale,
  getGurtsPublicSale,
  getGurtsPassSale,
  getHasMintedPublic,
  getHasMintedWhitelist,
  getIsWhitelisted,
  mintPublic,
  mintWhitelist,
  mintWithPass,
  checkIfClaimed,
  genProof
} from './etherscomponents/contractFunctions';

export default function Navbar() {
  const [connectedWallet, setConnectedWallet] = useState("");

  const [privateSale, setPrivateSale] = useState(false);
  const [publicSale, setPublicSale] = useState(false);
  const [claimSale, setClaimSale] = useState(false);

  const [maxSupply, setMaxSupply] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [price, setPrice] = useState("");

  const [hasMintedPublic, setHasMintedPublic] = useState(false);
  const [hasMintedWhitelist, setHasMintedWhitelist] = useState(false);

  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [ygBalance, setYGBalance] = useState(0);

  const [mintTab, setMintTab] = useState(0);
  
  const [tokenIds, setTokensIds] = useState("");
  const [validInput, setValidInput] = useState(false);

  const [checkId, setCheckId] = useState(0);
  const [isClaimed, setIsClaimed] = useState(0);



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

        getGurtsTotalSupply().then(response => {
          //console.log("Total Supply: ", response);
          setTotalSupply(response);
        }).catch(console.log);
    
        getGurtsMaxSupply().then(response => {
          //console.log("Max Supply: ", response);
          setMaxSupply(response);
        }).catch(console.log);
    
        getGurtsPrice().then(response => {
          let inEther = ethers.utils.formatEther(response);
          //console.log("Gurts Price: ", inEther);
          setPrice(inEther);
        }).catch(console.log);
    
        getGurtsPrivateSale().then(response => {
          //console.log("Private Sale: ", response);
          setPrivateSale(response);
        }).catch(console.log);
    
        getGurtsPublicSale().then(response => {
          //console.log("Public Sale: ", response);
          setPublicSale(response);
        }).catch(console.log);
    
        getGurtsPassSale().then(response => {
          //console.log("Pass Sale: ", response);
          setClaimSale(response);
        }).catch(console.log);
      }
    } catch (err) {
        console.log(err);
        console.log("No ethereum service.");
    }
  },[connectedWallet]);

  const requestAccount = () => {
    try {
        window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (err) {
        console.log(err);
    }
  }

  const getAccount = async () => {
    try {
        console.log('ethereum connected');
        let accounts = await window.ethereum.request({ method: "eth_accounts" });

        if (accounts[0]) {
          console.log(`${accounts[0]} connected`);
          setConnectedWallet(accounts[0]);

          getHasMintedPublic(accounts[0]).then(response => {
            setHasMintedPublic(response);
            //console.log("Minted Public: ",  response);
          }).catch(console.log);

          getHasMintedWhitelist(accounts[0]).then(response => {
            setHasMintedWhitelist(response);
            //console.log("Minted Whitelist: ",  response);
          }).catch(console.log);

          getIsWhitelisted(accounts[0]).then(response => {
            setIsWhitelisted(response);
            //console.log("Is Whitelisted: ",  response);
          }).catch(console.log);

          getYGBalance(accounts[0]).then(response => {
            setYGBalance(response);
            //console.log("YG Balance: ",  response);
          }).catch(console.log);
        } else {
          console.log("no account connected");
          setConnectedWallet("");
        }
    } catch (err) {
        console.log(err);
    }
  }

  const handleMintPublic = () => {
    mintPublic().then(response => {
      console.log(response);
    }).catch(console.log);
  }

  const handleMintWhitelist = () => {
    genProof(connectedWallet).then(proof => {
      //console.log("your proof: ", proof);
      mintWhitelist(proof).then(response => {
        console.log(response);
      }).catch(console.log);
    }).catch(console.log);
  }

  const handleMintWithPass = () => {
    if (/^[0-9]+(,[0-9]+)*$/.test(tokenIds)) {
      let stringArray = tokenIds.split(",");
      let numberArray = stringArray.map(element => parseInt(element))
      //console.log(numberArray);
      mintWithPass(numberArray).then(response => {
        console.log(response);
      }).catch(console.log);
    }
  }

  const handleCheckIfClaimed = () => {
    checkIfClaimed(checkId).then(response => {
      //console.log(response);
      if (response) {
        setIsClaimed(1);
      } else {
        setIsClaimed(2);
      }
    }).catch(console.log);
  }

  const handleTokenIdInput = (e) => {
    setTokensIds(e.target.value);
    if (/^[0-9]+(,[0-9]+)*$/.test(e.target.value)) {
      setValidInput(true);
    } else {
      setValidInput(false);
    }
  }

  const handleCheckTokenIdInput = (e) => {
    if (e.target.value > 320) {
      setCheckId(320);
    } else if (e.target.value < 0) {
      setCheckId(0);
    } else {
      setCheckId(e.target.value);
    }
  }

  return (
    <div id="Mint" className="relative h-[1100px] grid grid-cols-1 xl:grid-cols-3">
      <svg className="absolute w-screen h-[1080px] fill-pink-200 z-[1] drop-shadow-[0px_-10px_10px_rgba(0,0,0,0.25)]"><Wave/></svg>
      <div className="relative col-span-1 z-[2]">
          <img src="bgyogurtformint2.png" className="absolute bottom-10 left-16 w-[600px] hidden xl:block"/>
      </div>
      <div className="col-span-2 flex z-[2]">
        <div className="bg-white grow h-[600px] my-0 xl:my-auto mx-10 lg:mx-40 rounded-3xl drop-shadow-xl flex flex-col">
          <img src="strawberry.png" className="absolute w-16 bottom-16 right-16 animate-wiggle"/>
          <div onClick={requestAccount} className={connectedWallet == "" ?
              "text-white m-auto flex font-bold bg-slate-700 hover:bg-slate-800 h-20 w-64 rounded-xl transition-all cursor-pointer select-none" :
              "text-white m-auto flex font-bold bg-white h-[80%] w-[100%] rounded-xl transition-all"
          }>
            {connectedWallet == "" ? (
              <div className="m-auto text-5xl">Connect</div>
            ):(
              <div className="mx-auto text-black flex flex-col">
                <div className="mx-auto flex text-sm lg:text-xl gap-5 mb-16">

                  <div onClick={() => setMintTab(0)} className={mintTab == 0 ?
                    "bg-green-400 text-white py-2 px-2 lg:px-5 rounded-xl select-none transition-all" :
                    "bg-gray-100 hover:bg-gray-200 py-2 px-2 lg:px-5 rounded-xl cursor-pointer select-none transition-all"
                  }>Public</div>

                  <div onClick={() => setMintTab(1)} className={mintTab == 1 ?
                    "bg-green-400 text-white py-2 px-2 lg:px-5 rounded-xl select-none transition-all" :
                    "bg-gray-100 hover:bg-gray-200 py-2 px-2 lg:px-5 rounded-xl cursor-pointer select-none transition-all"
                  }>Whitelist</div>

                  <div onClick={() => setMintTab(2)} className={mintTab == 2 ?
                    "bg-green-400 text-white py-2 px-2 lg:px-5 rounded-xl select-none transition-all" :
                    "bg-gray-100 hover:bg-gray-200 py-2 px-2 lg:px-5 rounded-xl cursor-pointer select-none transition-all"
                  }>Pass Claim</div>

                </div>
                <div className="mx-auto">Minted: </div>
                <div className="mx-auto w-[500px] h-[30px] relative hidden 2xl:block">
                  <div className="bg-green-700 absolute flex rounded-xl" style={{width: 500, height: 30}}>
                    <div className="m-auto text-white z-[1]">{totalSupply}/{maxSupply}</div>
                  </div>
                  <div className="bg-green-500 absolute rounded-xl" style={{width: totalSupply > 0 && maxSupply > 0 ? (500 * ((totalSupply < 180 ? 180 : totalSupply) / maxSupply)) : 180, height: 30}}></div>
                </div>
                <div className="mx-auto w-[300px] h-[30px] relative block 2xl:hidden">
                  <div className="bg-green-700 absolute flex rounded-xl" style={{width: 300, height: 30}}>
                    <div className="m-auto text-white z-[1]">{totalSupply}/{maxSupply}</div>
                  </div>
                  <div className="bg-green-500 absolute rounded-xl" style={{width: totalSupply > 0 && maxSupply > 0 ? (300 * ((totalSupply < 180 ? 180 : totalSupply) / maxSupply)) : 180, height: 30}}></div>
                </div>
                {mintTab == 0 ? (
                  <div className="animate-introSlide flex flex-col">
                    <div className="mx-auto mt-8">Price: Ξ{price}</div>
                    {totalSupply < maxSupply - 321 ? (
                      <>
                        {hasMintedPublic ? (
                          <>
                            {publicSale ? (
                              <div onClick={handleMintPublic} className="mx-auto mt-8 bg-green-500 hover:bg-green-400 px-5 py-2 rounded-xl text-white cursor-pointer select-none transition-all">Mint</div>
                            ):(
                              <div className="mx-auto mt-8 bg-zinc-500 px-5 py-2 rounded-xl text-white select-none transition-all">Public Not Live</div>
                            )}
                          </>
                        ):(
                          <div className="mx-auto mt-8 bg-zinc-500 px-5 py-2 rounded-xl text-white select-none transition-all">Minted</div>
                        )}
                      </>
                    ):(
                      <div className="mx-auto mt-8 bg-zinc-500 px-5 py-2 rounded-xl text-white select-none transition-all">OOS</div>
                    )}
                  </div>
                ):(
                  <></>
                )}
                {mintTab == 1 ? (
                  <div className="animate-introSlide flex flex-col">
                    <div className="mx-auto mt-8">Price: Ξ{price}</div>
                    {totalSupply < maxSupply ? (
                      <>
                        {!hasMintedWhitelist ? (
                          <>
                            {privateSale ? (
                              <>
                                {isWhitelisted ? (
                                  <div onClick={handleMintWhitelist} className="mx-auto mt-8 bg-green-500 hover:bg-green-400 px-5 py-2 rounded-xl text-white cursor-pointer select-none transition-all">Mint Whitelist</div>
                                ):(
                                  <div className="mx-auto mt-8 bg-zinc-500 px-5 py-2 rounded-xl text-white select-none transition-all">Not Whitelisted</div>
                                )}
                              </>
                            ):(
                              <div className="mx-auto mt-8 bg-zinc-500 px-5 py-2 rounded-xl text-white select-none transition-all">WL Not Live</div>
                            )}
                          </>
                        ):(
                          <div className="mx-auto mt-8 bg-zinc-500 px-5 py-2 rounded-xl text-white select-none transition-all">Minted WL</div>
                        )}
                      </>
                    ):(
                      <div className="mx-auto mt-8 bg-zinc-500 px-5 py-2 rounded-xl text-white select-none transition-all">OOS</div>
                    )}
                  </div>
                ):(
                  <></>
                )}
                {mintTab == 2 ? (
                  <div className="animate-introSlide flex flex-col">
                    <div className="mx-auto mt-8">Price: Ξ0.0</div>
                    {totalSupply < maxSupply ? (
                      <>
                        {claimSale ? (
                          <>
                            <form className="flex flex-col mx-auto mt-4">
                              <div>Token Id(s)</div>
                              <input
                                value={tokenIds}
                                type="text"
                                pattern="^[0-9]+(,[0-9]+)*$"
                                onChange={handleTokenIdInput}
                                placeholder="1, 2, 3, 4"
                                className="w-96 pl-2 p-1 focus:outline-none rounded-lg bg-neutral-700 invalid:ring invalid:ring-red-300 invalid:text-red-400 text-sm text-white"
                              />
                            </form>
                            {validInput ? (
                              <div onClick={handleMintWithPass} className="mx-auto mt-2 bg-green-500 hover:bg-green-400 px-5 py-2 rounded-xl text-white cursor-pointer select-none transition-all">Claim</div>
                            ):(
                              <div className="mx-auto mt-2 bg-zinc-500 px-5 py-2 rounded-xl text-white select-none transition-all">Claim</div>
                            )}
                          </>
                        ):(
                          <div className="mx-auto mt-2 bg-zinc-500 px-5 py-2 rounded-xl text-white select-none transition-all">Claim Not Live</div>
                        )}
                      </>
                    ):(
                      <div className="mx-auto mt-2 bg-zinc-500 px-5 py-2 rounded-xl text-white select-none transition-all">OOS</div>
                    )}
                    <form className="flex flex-col mx-auto mt-5">
                      <div className="text-sm">Claim Check</div>
                      <div className="flex gap-2">
                        <input
                          value={checkId}
                          type="text"
                          pattern="^[0-9]+(,[0-9]+)*$"
                          onChange={handleCheckTokenIdInput}
                          placeholder="token"
                          className="w-32 pl-2 p-1 focus:outline-none rounded-lg bg-neutral-700 invalid:ring invalid:ring-red-300 invalid:text-red-400 text-sm text-white"
                        />
                        <div onClick={handleCheckIfClaimed} className="bg-sky-500 hover:bg-sky-400 rounded-xl text-lg p-2 text-white cursor-pointer select-none transition-all flex"><AiOutlineSearch className="m-auto"/></div>
                      </div>
                    </form>  
                    {isClaimed != 0 ? (
                      <div className={isClaimed == 2 ? "mx-auto text-green-500 mt-2" : "mx-auto text-red-500 mt-2"}>{isClaimed == 2 ? <>Not claimed</> : <>Claimed</>}</div>
                    ):(
                      <></>
                    )}
                  </div>
                ):(
                  <></>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
  