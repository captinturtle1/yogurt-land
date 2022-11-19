import { ethers } from "ethers";
import { useState, useEffect } from 'react';
import { TbStack3, TbStack } from 'react-icons/Tb';
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
    const [dashboardState, setDashboardState] = useState(0);
    const [batchOption, setBatchOption] = useState(0);
    const [selectedWithdraw, setSelectedWithdraw] = useState([]);
    const [selectedDeposit, setSelectedDeposit] = useState([]);

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
        getCollectionStats();
    });

    const getCollectionStats = () => {
        getGurtsTotalSupply().then(value => {
            if (value != false) {
                setGurtsTotalSupply(value);
            }
        }).catch(console.log);

        getTotalStaked().then(value => {
            if (value != false) {
                setTotalStaked(value);
            }
        }).catch(console.log);
    }

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
            setSelectedWithdraw([...[]]);
            console.log(tx);
            tx.wait(1).then(response => {
                console.log(response);
                getAccount();
                getCollectionStats();
            });
        }).catch(console.log);
    }

    const callDepositGurts = (tokenArray) => {
        depositGurts(tokenArray).then(tx => {
            setSelectedDeposit([...[]]);
            console.log(tx);
            tx.wait(1).then(response => {
                console.log(response);
                getAccount();
                getCollectionStats();
            });
        }).catch(console.log);
    }

    const handleSelectWithdraw = (tokenId) => {
        let tokenSelectedArray = [];
        tokenSelectedArray = selectedWithdraw;
        if (tokenSelectedArray.includes(tokenId)) {
            tokenSelectedArray.splice(tokenSelectedArray.indexOf(tokenId), 1);
        } else {
            tokenSelectedArray.push(tokenId);
        }
        setSelectedWithdraw([...tokenSelectedArray]);
        console.log(tokenSelectedArray);
    }

    const handleSelectedDeposit = (tokenId) => {
        let tokenSelectedArray = [];
        tokenSelectedArray = selectedDeposit;
        if (tokenSelectedArray.includes(tokenId)) {
            tokenSelectedArray.splice(tokenSelectedArray.indexOf(tokenId), 1);
        } else {
            tokenSelectedArray.push(tokenId);
        }
        setSelectedDeposit([...tokenSelectedArray]);
        console.log(tokenSelectedArray);
    }

    const tokenCards = userAllTokens.map((element, index) => 
        <div className="flex flex-col w-full h-full gap-5">
            <div key={element} className="bg-[#765050] p-8 rounded-xl drop-shadow-lg m-auto relative">
                <img src={userTokensData[index] === undefined ? "placeholder.png" : userTokensData[index][0]} className="h-80 w-80 lg:h-[17vw] lg:w-[17vw] rounded-xl object-cover animate-introSlide z-[11]"/>
                <div className="absolute -left-2 top-[55%] w-32 bg-red-400 text-white text-center text-3xl drop-shadow">Gurt #{element}</div>
                <div className="mt-6 xl:text-lg text-white">
                    <div>Total Stake: {userTokensData[index] === undefined ? "fetching..." : (userTokensData[index][2] / 86400).toFixed(2)}/Days</div>
                    {userTokensData[index] === undefined ? "fetching..." : userTokensData[index][1] != 0 ? (<div>Current Stake: {((Math.floor(Date.now() / 1000) - userTokensData[index][1]) / 86400).toFixed(2)}/Days</div>):(<div>Not Staked</div>)}
                </div>
            </div>
            <div className="grow"/>
            <div className="flex gap-4">
                <div onClick={userStakedGurts.includes(element) ? () => callWithdrawToken([element]) : () => callDepositGurts([element])} className="w-full h-16 bg-red-400 hover:bg-red-300 active:bg-red-400 transition-all rounded-xl flex cursor-pointer">
                    <div className="m-auto text-white text-2xl">{userStakedGurts.includes(element) ? (<>Withdraw</>):(<>Deposit</>)}</div>
                </div>
                <div onClick={() => setDashboardState(1)} className="h-16 bg-blue-400 hover:bg-blue-300 active:bg-blue-400 transition-all rounded-xl flex cursor-pointer">
                    <TbStack3 className="w-16 m-auto text-white text-2xl"/>
                </div>
            </div>
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
        <div className="h-[2000px] lg:h-screen min-h-[900px] bg-pink-300 flex visible">
            <div className="w-full mx-5 2xl:mx-64 my-28 drop-shadow-xl grid grid-cols-1 lg:grid-cols-3 visible gap-10">
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
                <div onClick={requestAccount} className={connectedWallet !== undefined ? "bg-orange-100 rounded-xl transition-all w-full h-full m-auto flex flex-col max-w-[400px] lg:max-w-none p-10" : "m-auto text-black font-bold flex p-2 rounded bg-orange-100 hover:bg-orange-200 cursor-pointer select-none transition-all visible opacity-100 w-24 h-10 delay-100"}>
                    {connectedWallet !== undefined ?
                        (
                            <>
                                {dashboardState == 0 ? (
                                    <div className="m-auto text-black font-bold select-none flex flex-col w-full h-full">
                                        <div className="text-black mx-auto mt-auto font-bold text-3xl">Your Tokens</div>
                                        <form className="flex translate-y-6 z-[1]">
                                            <select
                                                value={selectedToken}
                                                onChange={handleTokenSelection}
                                                className="focus:outline-none bg-red-400 text-white m-auto py-2 px-10 rounded-xl mb-2 drop-shadow-lg"
                                            >
                                                {userAllTokens.map((element) =>
                                                    <option key={element} className="text-lg">{element}</option>
                                                )}
                                            </select>
                                        </form>
                                        {tokenCards[selectedToken]}
                                    </div>
                                ):(
                                    <div className="m-auto text-black font-bold select-none w-full h-full">
                                        <div className="flex flex-col gap-5 w-full h-full">
                                            <div className="text-black mx-auto font-bold text-3xl">Batch Stake/Unstake</div>
                                            <div className="flex gap-5 text-white m-auto">
                                                <div onClick={() => setBatchOption(0)} className={batchOption == 0 ? "bg-blue-500 px-4 py-2 rounded-full transition-all" : "p-2 text-black transition-all"}>Deposit</div>
                                                <div onClick={() => setBatchOption(1)} className={batchOption == 1 ? "bg-blue-500 px-4 py-2 rounded-full transition-all" : "p-2 text-black transition-all"}>Withdraw</div>
                                            </div>
                                            {batchOption == 0 ? (
                                                <div>
                                                    <div className="bg-red-400 text-white px-2 rounded-xl my-1 grid grid-cols-3 text-sm">
                                                        <div>token #</div>
                                                        <div>Current Stake</div>
                                                        <div>Total Stake</div>
                                                    </div>
                                                        <div className="max-h-[400px] overflow-y-auto">
                                                        {userGurts.map((element) => 
                                                            <div index={element} onClick={() => handleSelectedDeposit(element)} className={selectedDeposit.includes(element) ? "bg-[#765050] text-white p-2 rounded-xl my-1 transition-all cursor-pointer grid grid-cols-3" : "bg-[#8f6464] text-white p-2 rounded-xl my-1 transition-all cursor-pointer grid grid-cols-3"}>
                                                                <div>#{element}</div>
                                                                <div>Not Staked</div>
                                                                <div>{(userTokensData[userAllTokens.indexOf(element)][2] / 86400).toFixed(2)}/d</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ):(
                                                <div>
                                                    <div className="bg-red-400 text-white px-2 rounded-xl my-1 grid grid-cols-3 text-sm">
                                                        <div>token #</div>
                                                        <div>Current Stake</div>
                                                        <div>Total Stake</div>
                                                    </div>
                                                        <div className="max-h-[400px] overflow-y-auto">
                                                        {userStakedGurts.map((element) => 
                                                            <div index={element} onClick={() => handleSelectWithdraw(element)} className={selectedWithdraw.includes(element) ? "bg-[#765050] text-white p-2 rounded-xl my-1 transition-all cursor-pointer grid grid-cols-3" : "bg-[#8f6464] text-white p-2 rounded-xl my-1 transition-all cursor-pointer grid grid-cols-3"}>
                                                                <div>#{element}</div>
                                                                <div>{((Math.floor(Date.now() / 1000) - userTokensData[userAllTokens.indexOf(element)][1]) / 86400).toFixed(2)}/d</div>
                                                                <div>{(userTokensData[userAllTokens.indexOf(element)][2] / 86400).toFixed(2)}/d</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="grow"/>
                                            <div className="flex gap-4">
                                                <div onClick={batchOption == 0 ?  () => callDepositGurts(selectedDeposit) : () => callWithdrawToken(selectedWithdraw)} className="w-full h-16 bg-red-400 hover:bg-red-300 active:bg-red-400 transition-all rounded-xl flex cursor-pointer">
                                                    <div className="m-auto text-white text-2xl">{batchOption == 0 ? (<>Deposit</>):(<>Withdraw</>)}</div>
                                                </div>
                                                <div onClick={() => setDashboardState(0)} className="h-16 bg-blue-400 hover:bg-blue-300 active:bg-blue-400 transition-all rounded-xl flex cursor-pointer">
                                                    <TbStack className="w-16 m-auto text-white text-2xl"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
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