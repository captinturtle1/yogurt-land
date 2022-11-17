import { ethers } from "ethers";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import { getGurtsTotalSupply, getTotalStaked } from '../components/etherscomponents/contractFunctions';

export default function Navbar() {
    const [connectedWallet, setConnectedWallet] = useState();
    const [gurtsTotalSupply, setGurtsTotalSupply] = useState(0);
    const [totalStaked, setTotalStaked] = useState(0);
    const [userTokensArray, setUserTokensArray] = useState([1,2,3,4,5]);

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
        } catch (err) {
            console.log(err);
        }
    }

    const tokenCards = userTokensArray.map((element, index) =>
    <div key={index} className="bg-red-500 w-10 h-10">
        {element}
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
            <div className="absolute right-0 h-16 hidden lg:flex mr-16">
                <div className="m-auto bg-[#765050] hover:bg-[#8f6464] active:bg-[#5e3f3f] px-5 py-2 text-white rounded-full font-bold transition-all cursor-pointer">
                    <Link href="/">Home</Link>
                </div>
            </div>
        </div>
        <div className="h-screen bg-[#765050] flex visible">
            <div className="w-full mx-64 my-32 drop-shadow-xl grid grid-cols-3 visible">
                <div className={connectedWallet !== undefined ? "bg-orange-100 m-10 rounded-xl opacity-100 transition-all translate-x-0 visible delay-100 flex flex-col" : "bg-orange-100 m-10 rounded-xl opacity-0 transition-all translate-x-96 invisible flex flex-col"}>
                    <div className="text-black mx-auto mt-auto font-bold text-4xl mb-10">Collection Staked</div>
                    <div className="w-64 mx-auto mb-10">
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
                <div onClick={requestAccount} className={connectedWallet !== undefined ? "bg-orange-100 rounded-xl transition-all w-full h-full m-auto flex" : "m-auto text-black font-bold flex p-2 rounded bg-orange-100 hover:bg-orange-200 cursor-pointer select-none transition-all visible opacity-100 w-24 h-10 delay-100"}>
                    {connectedWallet !== undefined ?
                        (
                            <div className="m-auto text-black font-bold select-none flex flex-col">
                                <div className="text-black mx-auto mt-auto font-bold text-4xl mb-10">Collection Staked</div>
                                {tokenCards}
                                <div className="text-black mx-auto font-bold text-4xl">Total</div>
                                <div className="text-[#8f6464] mx-auto mb-auto font-bold text-3xl">{totalStaked}/{gurtsTotalSupply}</div>
                            </div>
                        ):(
                            <div className="m-auto select-none">Connect</div>
                        )}
                </div>
                <div className={connectedWallet !== undefined ? "bg-orange-100 m-10 rounded-xl opacity-100 transition-all translate-x-0 visible delay-100" : "bg-orange-100 m-10 rounded-xl opacity-0 transition-all -translate-x-96 invisible"}></div>
            </div>
        </div>
      </div>
    )
}