import { ethers } from "ethers";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import { getGurtsTotalSupply, getbaseUri, getTotalStaked, getUserTokensGurts, getUserTokensStaked, getUserStakePoints, getTokenInfo, depositGurts, withdrawGurts } from '../components/etherscomponents/contractFunctions';

export default function Navbar() {
    const [connectedWallet, setConnectedWallet] = useState();
    const [gurtsTotalSupply, setGurtsTotalSupply] = useState(0);
    const [totalStaked, setTotalStaked] = useState(0);
    const [userGurts, setUserGurts] = useState([]);
    const [userStakedGurts, setUserStakedGurts] = useState([]);
    const [userAllTokens, setUserAllTokens] = useState([]);
    const [userStakePoints, setUserStakePoints] = useState(0);
    const [selectedToken, setSelectedToken] = useState();
    const [userTokensData, setUserTokensData] = useState([]);

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
                setConnectedWallet();
            })

            getAccount();
          }
        } catch (err) {
            console.log(err);
            console.log("No ethereum service.");
        }
    },[connectedWallet]);

    useEffect(() => {
        getGurtsTotalSupply().then(value => {
            console.log("supply: ", value);
            if (value != false) {
                setGurtsTotalSupply(value);
            }
        }).catch(console.log);

        getTotalStaked().then(value => {
            console.log("staked: ", value);
            if (value != false) {
                setTotalStaked(value);
            }
        }).catch(console.log);
    });

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

            getUserTokensGurts(accounts[0]).then(active => {
                console.log("userTokensGurts: ", active);
                setUserGurts([...active]);

                getUserTokensStaked(accounts[0]).then(staked => {
                    console.log("userTokensStaked: ", staked);
                    setUserStakedGurts([...staked]);
                    let sortedTokensArray = active.concat(staked).sort()
                    setUserAllTokens([...sortedTokensArray]);
                    setSelectedToken(sortedTokensArray[0]);
                    getTokenData(sortedTokensArray);
                }).catch(console.log);
                
            }).catch(console.log);
            
            getUserStakePoints(accounts[0]).then(points => {
                setUserStakePoints(points);
            }).catch(console.log);

        } catch (err) {
            console.log(err);
        }
    }

    const getDailyPoints = () => {
        let currentRewards = 0;
        for (let i = 0; i < userStakedGurts.length; i++) {
            if (i == 0) {
                currentRewards = currentRewards + 86400;
            } else {
                currentRewards = currentRewards + 43200;
            }
        }
        return currentRewards;
    }

    const handleTokenSelection = event => {
        setSelectedToken(event.target.value);
    };

    const getTokenData = async (sortedTokensArray) => {
        let baseUri = await getbaseUri();
        let newTokenData = [];
        for (let i = 0; i < sortedTokensArray.length; i++) {
            let data = await (await fetch(`${baseUri}${sortedTokensArray[i]}`)).json();
            let currentData = [];
            currentData[0] = data.image;
            let tokenInfo = await getTokenInfo(sortedTokensArray[i]);
            currentData[1] = tokenInfo[0];
            currentData[2] = tokenInfo[1];
            newTokenData.push(currentData);
        }
        setUserTokensData([...newTokenData]);
    }

    const callWithdrawToken = (tokenArray) => {
        withdrawGurts(tokenArray).then(tx => {
            console.log(tx);
            tx.wait(1).then(console.log);
        }).catch(console.log);
    }

    const callDepositGurts = (tokenArray) => {
        depositGurts(tokenArray).then(tx => {
            console.log(tx);
            tx.wait(1).then(console.log);
        }).catch(console.log);
    }

    const tokenCards = userAllTokens.map((element, index) => 
        <div className="flex flex-col gap-5">
            <div key={index} className="bg-[#765050] p-8 rounded-xl relative drop-shadow-lg">
                <img src={userTokensData[index] === undefined ? "placeholder.png" : userTokensData[index][0]} className="w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] rounded-xl object-cover animate-introSlide"/>
                <div className="absolute left-4 bottom-32 w-32 bg-red-400 text-white text-center text-3xl drop-shadow">Gurt #{element}</div>
                <div className="mt-6 lg:text-lg text-white">
                    <div>Total Stake: {userTokensData[index] === undefined ? "fetching..." : userTokensData[index][2]}</div>
                    {userTokensData[index] === undefined ? "fetching..." : userTokensData[index][1] != 0 ? (<div>Current Stake: {((Math.floor(Date.now() / 1000) - userTokensData[index][1]) / 86400).toFixed(2)}/Days</div>):(<div>Not Staked</div>)}
                    
                </div>
            </div>
            {userStakedGurts.includes(element) ? (
                <div onClick={() => callWithdrawToken([element])} className="w-full h-16 bg-red-400 hover:bg-red-300 active:bg-red-400 transition-all rounded-xl flex cursor-pointer">
                    <div className="m-auto text-white text-2xl">Withdraw</div>
                </div>
            ):(
                <div onClick={() => callDepositGurts([element])} className="w-full h-16 bg-red-400 hover:bg-red-300 active:bg-red-400 transition-all rounded-xl flex cursor-pointer">
                    <div className="m-auto text-white text-2xl">Deposit</div>
                </div>
            )}
            
        </div>
    );

    return (
      <div>
        <Head>
            <title>Gurts</title>
            <meta name="description" content="Gurts webpage"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <div className="z-[100] fixed top-0 w-screen flex h-16 bg-white text-black select-none">
            <div className="flex absolute h-16 ">
                <img src="YV_LOGO2.png" className="h-10 my-auto ml-16"/>
                <div className="font-bold my-auto text-2xl">Gurts</div>
            </div>
            <Link href="/">
                <div className="absolute right-0 h-16 flex mr-16">
                    <div className="m-auto bg-[#765050] hover:bg-[#8f6464] active:bg-[#5e3f3f] px-5 py-2 text-white rounded-full font-bold transition-all cursor-pointer">
                        <a>Home</a>
                    </div>
                </div>
            </Link>
        </div>
        <div className="h-[2000px] lg:h-screen bg-[#765050] flex visible">
            <div className="w-full mx-5 2xl:mx-64 my-32 drop-shadow-xl grid grid-cols-1 lg:grid-cols-3 visible gap-10">
                <div className={connectedWallet !== undefined ? "bg-orange-100 rounded-xl transition-all w-full h-full lg:h-[80%] m-auto p-10 flex flex-col max-w-[400px] lg:max-w-none" : "bg-orange-100 m-10 rounded-xl opacity-0 transition-all translate-x-96 invisible flex flex-col"}>
                    <div className="text-black mx-auto mt-auto font-bold text-center text-4xl mb-10">Collection Staked</div>
                    <div className="w-48 lg:w-52 xl:w-64 mx-auto mb-10">
                        <CircularProgressbarWithChildren
                            value={totalStaked}
                            maxValue={gurtsTotalSupply}
                            strokeWidth={14}
                            styles={{
                                path: {stroke: `#8f6464`, strokeLinecap: 'butt', transition: 'stroke-dashoffset 0.5s ease 0s', transform: 'rotate(0.50turn)', transformOrigin: 'center center'},
                                trail: {stroke: '#8f646480', strokeLinecap: 'butt', transform: 'rotate(0.50turn)', transformOrigin: 'center center'},
                            }}
                        ><div className="font-bold text-5xl text-[#765050]">{(totalStaked / gurtsTotalSupply) * 100}%</div></CircularProgressbarWithChildren>
                    </div>
                    <div className="text-black mx-auto font-bold text-4xl">Total</div>
                    <div className="text-[#8f6464] mx-auto mb-auto font-bold text-3xl">{totalStaked}/{gurtsTotalSupply}</div>
                </div>
                <div onClick={requestAccount} className={connectedWallet !== undefined ? "bg-orange-100 rounded-xl transition-all w-full h-full m-auto flex p-10 max-w-[400px] lg:max-w-none" : "m-auto text-black font-bold flex p-2 rounded bg-orange-100 hover:bg-orange-200 cursor-pointer select-none transition-all visible opacity-100 w-24 h-10 delay-100"}>
                    {connectedWallet !== undefined ?
                        (
                            <div className="m-auto text-black font-bold select-none flex flex-col">
                                <div className="text-black mx-auto mt-auto font-bold text-4xl mb-2">Your Tokens</div>
                                <form className="flex translate-y-6 z-[1]">
                                    <select
                                        value={selectedToken}
                                        onChange={handleTokenSelection}
                                        className="focus:outline-none bg-blue-400 text-white m-auto py-2 px-10 rounded-xl mb-2 drop-shadow-lg"
                                    >
                                        {userAllTokens.map((element, index) =>
                                            <option key={index} className="">{element}</option>
                                        )}
                                    </select>
                                </form>
                                {tokenCards[selectedToken]}
                            </div>
                        ):(
                            <div className="m-auto select-none">Connect</div>
                        )}
                </div>
                <div className={connectedWallet !== undefined ? "bg-orange-100 rounded-xl transition-all w-full h-full lg:h-[80%] m-auto p-10 flex flex-col max-w-[400px] lg:max-w-none" : "bg-orange-100 m-10 rounded-xl opacity-0 transition-all -translate-x-96 invisible flex flex-col"}>
                    <div className="text-black mx-auto mt-auto font-bold text-4xl">Your Stats</div>
                    <div className="text-[#8f6464] mx-auto font-bold text-3xl flex flex-col items-center mb-8">
                        <div>Held: {userGurts.length}</div>
                        <div>Staked: {userStakedGurts.length}</div>
                        <div>Total: {userAllTokens.length}</div>
                    </div>
                    <div className="text-black mx-auto font-bold text-4xl">Earning</div>
                    <div className="text-[#8f6464] mx-auto font-bold text-3xl mb-8">{getDailyPoints() / 86400}/Day</div>
                    <div className="text-black mx-auto font-bold text-4xl">Stake Points</div>
                    <div className="text-[#8f6464] mx-auto mb-auto font-bold text-3xl">{(userStakePoints / 86400).toFixed(5)}</div>
                </div>
            </div>
        </div>
      </div>
    )
}