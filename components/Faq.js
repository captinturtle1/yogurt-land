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
                <div className="w-auto lg:w-[600px] font-semibold text-lg lg:text-xl ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum tincidunt lectus luctus vestibulum. Donec mollis nisl nec elit vestibulum, ut rutrum purus aliquet.</div>
            </div>
            <div className="z-[2] m-auto font-semibold lg:font-bold text-md lg:text-xl select-none transition-all text-white">
                <div onClick={() => handleBoxClick(1)} className={currentBox != 1 ? "bg-[#8f6464] h-12 w-[80vw] lg:w-[600px] px-4 py-[10px] rounded-xl cursor-pointer transition-all relative visible my-2" : "bg-[#b18181] h-64 w-[80vw] lg:w-[600px] p-5 rounded-xl cursor-pointer items-center transition-all relative visible"}>
                    <div className={currentBox == 1 ? "transition-all" : "grow transition-all"}>Lorem ipsum</div>
                    <div className={currentBox == 1 ? "mt-5 opacity-100 visible transition-all delay-100" : "opacity-0 w-0 invisible"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum tincidunt lectus luctus vestibulum. Donec mollis nisl nec elit vestibulum, ut rutrum purus aliquet.</div>
                    <FiArrowDownRight className={currentBox == 1 ? "rotate-180 transition-all absolute bottom-5 right-5" : "rotate-0 absolute bottom-[12px] right-5 transition-all"}/>
                </div>
                <div onClick={() => handleBoxClick(2)} className={currentBox != 2 ? "bg-[#8f6464] h-12 w-[80vw] lg:w-[600px] px-4 py-[10px] rounded-xl cursor-pointer transition-all relative visible my-2" : "bg-[#b18181] h-64 w-[80vw] lg:w-[600px] p-5 rounded-xl cursor-pointer items-center transition-all relative visible"}>
                    <div className={currentBox == 2 ? "transition-all" : "grow transition-all"}>Lorem ipsum</div>
                    <div className={currentBox == 2 ? "mt-5 opacity-100 visible transition-all delay-100" : "opacity-0 w-0 invisible"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum tincidunt lectus luctus vestibulum. Donec mollis nisl nec elit vestibulum, ut rutrum purus aliquet.</div>
                    <FiArrowDownRight className={currentBox == 2 ? "rotate-180 transition-all absolute bottom-5 right-5" : "rotate-0 absolute bottom-[12px] right-5 transition-all"}/>
                </div>
                <div onClick={() => handleBoxClick(3)} className={currentBox != 3 ? "bg-[#8f6464] h-12 w-[80vw] lg:w-[600px] px-4 py-[10px] rounded-xl cursor-pointer transition-all relative visible my-2" : "bg-[#b18181] h-64 w-[80vw] lg:w-[600px] p-5 rounded-xl cursor-pointer items-center transition-all relative visible"}>
                    <div className={currentBox == 3 ? "transition-all" : "grow transition-all"}>Lorem ipsum</div>
                    <div className={currentBox == 3 ? "mt-5 opacity-100 visible transition-all delay-100" : "opacity-0 w-0 invisible"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum tincidunt lectus luctus vestibulum. Donec mollis nisl nec elit vestibulum, ut rutrum purus aliquet.</div>
                    <FiArrowDownRight className={currentBox == 3 ? "rotate-180 transition-all absolute bottom-5 right-5" : "rotate-0 absolute bottom-[12px] right-5 transition-all"}/>
                </div>
                <div onClick={() => handleBoxClick(4)} className={currentBox != 4 ? "bg-[#8f6464] h-12 w-[80vw] lg:w-[600px] px-4 py-[10px] rounded-xl cursor-pointer transition-all relative visible my-2" : "bg-[#b18181] h-64 w-[80vw] lg:w-[600px] p-5 rounded-xl cursor-pointer items-center transition-all relative visible"}>
                    <div className={currentBox == 4 ? "transition-all" : "grow transition-all"}>Lorem ipsum</div>
                    <div className={currentBox == 4 ? "mt-5 opacity-100 visible transition-all delay-100" : "opacity-0 w-0 invisible"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum tincidunt lectus luctus vestibulum. Donec mollis nisl nec elit vestibulum, ut rutrum purus aliquet.</div>
                    <FiArrowDownRight className={currentBox == 4 ? "rotate-180 transition-all absolute bottom-5 right-5" : "rotate-0 absolute bottom-[12px] right-5 transition-all"}/>
                </div>
                <div onClick={() => handleBoxClick(5)} className={currentBox != 5 ? "bg-[#8f6464] h-12 w-[80vw] lg:w-[600px] px-4 py-[10px] rounded-xl cursor-pointer transition-all relative visible my-2" : "bg-[#b18181] h-64 w-[80vw] lg:w-[600px] p-5 rounded-xl cursor-pointer items-center transition-all relative visible"}>
                    <div className={currentBox == 5 ? "transition-all" : "grow transition-all"}>Lorem ipsum</div>
                    <div className={currentBox == 5 ? "mt-5 opacity-100 visible transition-all delay-100" : "opacity-0 w-0 invisible"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum tincidunt lectus luctus vestibulum. Donec mollis nisl nec elit vestibulum, ut rutrum purus aliquet.</div>
                    <FiArrowDownRight className={currentBox == 5 ? "rotate-180 transition-all absolute bottom-5 right-5" : "rotate-0 absolute bottom-[12px] right-5 transition-all"}/>
                </div>
                <div onClick={() => handleBoxClick(6)} className={currentBox != 6 ? "bg-[#8f6464] h-12 w-[80vw] lg:w-[600px] px-4 py-[10px] rounded-xl cursor-pointer transition-all relative visible my-2" : "bg-[#b18181] h-64 w-[80vw] lg:w-[600px] p-5 rounded-xl cursor-pointer items-center transition-all relative visible"}>
                    <div className={currentBox == 6 ? "transition-all" : "grow transition-all"}>Lorem ipsum</div>
                    <div className={currentBox == 6 ? "mt-5 opacity-100 visible transition-all delay-100" : "opacity-0 w-0 invisible"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum tincidunt lectus luctus vestibulum. Donec mollis nisl nec elit vestibulum, ut rutrum purus aliquet.</div>
                    <FiArrowDownRight className={currentBox == 6 ? "rotate-180 transition-all absolute bottom-5 right-5" : "rotate-0 absolute bottom-[12px] right-5 transition-all"}/>
                </div>
            </div>
        </div>
    )
}