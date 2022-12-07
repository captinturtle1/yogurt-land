import { ethers } from "ethers";
import { useState, useEffect } from 'react';
import { TbStack3, TbStack } from 'react-icons/tb';
import Head from 'next/head';
import Link from 'next/link';

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import {
    getGurtsTotalSupply,
    getGurtsMaxSupply,
    getbaseUri,
    getUserTokensGurts,
} from '../components/etherscomponents/contractFunctions';

export default function Navbar() {
    const [connectedWallet, setConnectedWallet] = useState();
    const [gurtsTotalSupply, setGurtsTotalSupply] = useState(0);
    const [gurtsMaxSupply, setGurtsMaxSupply] = useState(0);
    const [userGurts, setUserGurts] = useState([]);
    const [selectedToken, setSelectedToken] = useState();
    const [userTokensData, setUserTokensData] = useState([]);
    const [userTokensImages, setUserTokensImages] = useState([]);
    const [dashboardState, setDashboardState] = useState(0);

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
            setGurtsTotalSupply(value);
        }).catch(console.log);
        
        getGurtsMaxSupply().then(value => {
            setGurtsMaxSupply(value);
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

            getUserTokensGurts(accounts[0]).then(gurts => {
                setUserGurts([...gurts]);
                setSelectedToken(0);
                getTokenData(gurts);
            }).catch(console.log);
        } catch (err) {
            console.log(err);
        }
    }

    const handleTokenSelection = event => {
        setSelectedToken(event.target.value);
    };

    const getTokenData = (tokens) => {
        let newTokenData = [];
        let newTokenImages = [];
        for (let i = 0; i < tokens.length; i++) {
            let currentData = [];
            newTokenImages[i] = `https://ipfs.filebase.io/ipfs/QmQLQRipQJ1thWedrPvtcwdhwkpKi6jhiW2Rv6Ft4ugjsm/${tokens[i]}.png`
            fetch(`https://ipfs.filebase.io/ipfs/QmPQ5nUZzKL66RR5hAgjHyHhe2LL8hPp7mot783am7EYyP/${tokens[i]}`)
            .then((response) => response.json())
            .then((data) => {
                for (let j = 0; j < data.attributes.length; j++) {
                    currentData[j] = data.attributes[j];
                }
                newTokenData.push(currentData);
                if (i == tokens.length - 1) {
                    setUserTokensData([...newTokenData]);
                    setUserTokensImages([...newTokenImages]);
                }
            }).catch(console.log);
        }
    }

    const tokenCards = userGurts.map((element, index) => 
        <div key={element} className="flex flex-col w-full h-full gap-5">
            <div className="bg-[#765050] p-8 rounded-xl drop-shadow-lg m-auto relative">
                <img src={userTokensImages[index] === undefined ? "placeholder.png" : userTokensImages[index]} className="h-80 w-80 lg:h-[22vw] lg:w-[17vw] rounded-xl object-cover animate-introSlide z-[11]"/>
                <div className="absolute -left-2 top-[55%] w-32 bg-red-400 text-white text-center text-3xl drop-shadow">Gurt #{element}</div>
            </div>
            <div className="grow"/>
        </div>
    );

    const tokenData = userGurts.map((element, index) => 
        <div key={element} className="grid grid-cols-2 w-full h-full gap-5">
            {userTokensData[index] === undefined ? (
                <></>
            ):(
                <>
                    {userTokensData[index].map(trait => 
                        <div key={trait.trait_type} className="">
                            <div className="text-xl font-bold">{trait.trait_type}</div>
                            <div className="text-xl">{trait.value}</div>
                        </div>
                    )}
                </>
            )}
        </div>
    );

    return (
      <div>
        <Head>
          <title>Gurts Dashboard</title>
          <meta name="description" content="The Gurts NFT dashboard."/>
          <link rel="icon" href="/favicon.ico"/>
          <meta property="og:title" content="Gurts" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.yogurtverse.xyz/" />
          <meta property="og:image" content="https://www.yogurtverse.xyz/yvlogoBanner.png" />
          <meta property="og:description" content="The Gurts NFT dashboard." />
          <meta name="theme-color" content="#F87171" />
          <meta name="twitter:card" content="summary_large_image" />
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
                    <div className="text-black mx-auto mt-auto font-bold text-center text-4xl mb-10">Collection Minted</div>
                    <div className="w-48 lg:w-52 xl:w-64 mx-auto mb-10">
                        <CircularProgressbarWithChildren
                            value={gurtsTotalSupply}
                            maxValue={gurtsMaxSupply}
                            strokeWidth={14}
                            styles={{
                                path: {stroke: `#5e3f3f`, strokeLinecap: 'butt', transition: 'stroke-dashoffset 0.5s ease 0s', transform: 'rotate(0.50turn)', transformOrigin: 'center center'},
                                trail: {stroke: '#8f6464', strokeLinecap: 'butt', transform: 'rotate(0.50turn)', transformOrigin: 'center center'},
                            }}
                            className="drop-shadow-lg"
                        ><div className="font-bold text-5xl text-[#765050]">{((gurtsTotalSupply / gurtsMaxSupply) * 100).toPrecision(3)}%</div></CircularProgressbarWithChildren></div>
                    <div className="text-black mx-auto font-bold text-4xl">Total</div>
                    <div className="text-[#8f6464] mx-auto mb-auto font-bold text-3xl">{gurtsTotalSupply}/{gurtsMaxSupply}</div>
                </div>
                <div onClick={requestAccount} className={connectedWallet !== undefined ? "bg-orange-100 rounded-xl transition-all w-full h-full m-auto flex flex-col max-w-[400px] lg:max-w-none p-10" : "m-auto text-black font-bold flex p-2 rounded bg-orange-100 hover:bg-orange-200 cursor-pointer select-none transition-all visible opacity-100 w-24 h-10 delay-100"}>
                    {connectedWallet !== undefined ?
                        (
                            <div className="m-auto text-black font-bold select-none flex flex-col w-full h-full">
                                <div className="text-black mx-auto mt-auto font-bold text-3xl">Your Tokens</div>
                                {userGurts.length > 0 ? (
                                    <>
                                        <form className="flex translate-y-6 z-[1]">
                                            <select
                                                value={selectedToken}
                                                onChange={handleTokenSelection}
                                                className="focus:outline-none bg-red-400 text-white m-auto py-2 px-10 rounded-xl mb-2 drop-shadow-lg"
                                            >
                                                {userGurts.map((element) =>
                                                    <option key={element} className="text-lg">{element}</option>
                                                )}
                                            </select>
                                        </form>
                                        {tokenCards[selectedToken]}
                                    </>
                                ):(
                                    <div className="text-2xl mx-auto mt-64 grow">
                                        No gurts
                                    </div>
                                )}
                            </div>
                        ):(
                            <div className="m-auto select-none">Connect</div>
                        )}
                </div>
                <div className={connectedWallet !== undefined ? "bg-orange-100 rounded-xl transition-all w-full h-full lg:h-[80%] m-auto p-10 flex flex-col max-w-[400px] lg:max-w-none" : "bg-orange-100 m-10 rounded-xl opacity-0 transition-all -translate-x-96 invisible flex flex-col"}>
                    {userGurts.length > 0 ? (
                        <div className="flex flex-col gap-8">
                            <div className="text-black mx-auto mt-auto font-bold text-4xl">Token Traits</div>
                            {tokenData[selectedToken]}
                        </div>
                    ):(
                        <div className="text-2xl mx-auto mt-64 grow">
                            No gurts
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    )
}