import { useState } from 'react';
import { FiArrowDownRight } from 'react-icons/fi';

import Wave from '../public/wave2.svg';

export default function Faq() {
    const [currentBox, setCurrentBox] = useState(0);

    const handleBoxClick = (boxNum) => {
        if (currentBox != boxNum) {
            setCurrentBox(boxNum);
        } else {
            setCurrentBox(0);
        }
    }
    return (
        <div id="Faq" className="relative h-[1050px] 2xl:h-[950px] grid grid-cols-1 2xl:grid-cols-2 p-6 lg:p-44 z-[3] gap-10">
            <svg className="absolute w-screen h-[1300px] 2xl:h-[1080px] fill-emerald-500 left-0 drop-shadow-[0px_10px_10px_rgba(0,0,0,0.25)]"><Wave/></svg>
            <img src="yogurt.png" className="absolute w-10 lg:w-24 bottom-0 left-4 lg:left-32 animate-wiggle"/>
            <div className="m-auto z-[2] text-white">
                <div className="text-9xl font-bold flex just justify-center drop-shadow-lg">Faq</div>
                <div className="w-full h-4 bg-[#8f6464] rounded-full my-10"></div>
                <div className="w-auto lg:w-[600px] font-semibold text-lg lg:text-xl flex">
                    <div className="m-auto">Frequently asked questions</div>
                </div>
            </div>
            <div className="z-[2] mx-auto lg:m-auto font-semibold lg:font-bold text-xl select-none transition-all text-white">
                <div onClick={() => handleBoxClick(1)} className={currentBox != 1 ? "bg-[#8f6464] h-12 w-[80vw] lg:w-[600px] px-4 py-[10px] rounded-xl cursor-pointer transition-all relative visible my-2" : "bg-[#b18181] h-32 w-[80vw] lg:w-[600px] p-5 rounded-xl cursor-pointer items-center transition-all relative visible"}>
                    <div className={currentBox == 1 ? "transition-all" : "grow transition-all"}>Mint date</div>
                    <div className={currentBox == 1 ? "mt-5 opacity-100 visible transition-all delay-100" : "opacity-0 w-0 invisible"}>December 5th</div>
                    <FiArrowDownRight className={currentBox == 1 ? "rotate-180 transition-all absolute bottom-5 right-5" : "rotate-0 absolute bottom-[12px] right-5 transition-all"}/>
                </div>
                <div onClick={() => handleBoxClick(2)} className={currentBox != 2 ? "bg-[#8f6464] h-12 w-[80vw] lg:w-[600px] px-4 py-[10px] rounded-xl cursor-pointer transition-all relative visible my-2" : "bg-[#b18181] h-48 w-[80vw] lg:w-[600px] p-5 rounded-xl cursor-pointer items-center transition-all relative visible"}>
                    <div className={currentBox == 2 ? "transition-all" : "grow transition-all"}>Mint price</div>
                    <div className={currentBox == 2 ? "mt-5 opacity-100 visible transition-all delay-100" : "opacity-0 w-0 invisible"}>.015 For WL and Public. 2 WL spots and 1 free mint for YV pass holders</div>
                    <FiArrowDownRight className={currentBox == 2 ? "rotate-180 transition-all absolute bottom-5 right-5" : "rotate-0 absolute bottom-[12px] right-5 transition-all"}/>
                </div>
                <div onClick={() => handleBoxClick(3)} className={currentBox != 3 ? "bg-[#8f6464] h-12 w-[80vw] lg:w-[600px] px-4 py-[10px] rounded-xl cursor-pointer transition-all relative visible my-2" : "bg-[#b18181] h-80 w-[80vw] lg:w-[600px] p-5 rounded-xl cursor-pointer items-center transition-all relative visible"}>
                    <div className={currentBox == 3 ? "transition-all" : "grow transition-all"}>Utilities</div>
                    <div className={currentBox == 3 ? "mt-5 opacity-100 visible transition-all delay-100" : "opacity-0 w-0 invisible"}>Staking your Gurt will allow you to earn $YOGURT over time, which will be used to unlock levels/roles in the discord, that will allow you to access new information, connections, and alpha utility. Access through staking to some layers of the already formed YogurtVerse community, and making connections and learning new information along your journey.</div>
                    <FiArrowDownRight className={currentBox == 3 ? "rotate-180 transition-all absolute bottom-5 right-5" : "rotate-0 absolute bottom-[12px] right-5 transition-all"}/>
                </div>
            </div>
        </div>
    )
}