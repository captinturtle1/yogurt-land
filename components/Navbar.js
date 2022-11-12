import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import Link from 'next/link'

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div>
    <div className="z-[10] fixed top-0 w-screen flex h-16 bg-white text-black select-none">
      <ScrollLink to="Landing" spy={true} smooth={true} offset={0} duration={600} className="flex absolute h-16 ">
          <img src="YV_LOGO2.png" className="h-10 my-auto ml-16 cursor-pointer"/>
          <div className="font-bold my-auto text-2xl cursor-pointer">Yogurt Verse</div>
      </ScrollLink>
      <div className="m-auto hidden lg:flex gap-5 font-bold">
          <ScrollLink to="Mint" spy={true} smooth={true} offset={0} duration={600} className="text-black hover:text-zinc-500 active:text-zinc-600 transition-all cursor-pointer">mint</ScrollLink>
          <ScrollLink to="About" spy={true} smooth={true} offset={0} duration={600} className="text-black hover:text-zinc-500 active:text-zinc-600 transition-all cursor-pointer">about</ScrollLink>
          <ScrollLink to="Faq" spy={true} smooth={true} offset={0} duration={600} className="text-black hover:text-zinc-500 active:text-zinc-600 transition-all cursor-pointer">faq</ScrollLink>
      </div>
      <div className="absolute right-0 h-16 hidden lg:flex mr-16">
        <div className="m-auto bg-[#765050] hover:bg-[#8f6464] active:bg-[#5e3f3f] px-5 py-2 text-white rounded-full font-bold transition-all cursor-pointer">
          <Link href="/stake">Stake</Link>
        </div>
      </div>
      <div className=" flex lg:hidden">
          <AiOutlineMenu onClick={() => setMobileMenu(!mobileMenu)} className={mobileMenu ? "absolute right-0 h-16 mr-16 cursor-pointer text-2xl invisible opacity-0 transition-all" : "absolute right-0 h-16 mr-16 cursor-pointer text-2xl visible opacity-100 transition-all"}/>
          <AiOutlineClose onClick={() => setMobileMenu(!mobileMenu)} className={mobileMenu ? "absolute right-0 h-16 mr-16 cursor-pointer text-2xl visible opacity-100 transition-all" : "absolute right-0 h-16 mr-16 cursor-pointer text-2xl invisible opacity-0 transition-all"}/>
      </div>
    </div>
    <div className={mobileMenu ? "z-[9] fixed h-screen w-screen bg-[#8f6464] opacity-100 transition-all flex visible lg:invisible" : "z-[9] fixed h-screen w-screen bg-[#8f6464] opacity-0 transition-all invisible"}>
      <div className={mobileMenu ? "m-auto flex flex-col text-center font-bold opacity-100 text-3xl gap-10" : "m-auto flex flex-col text-center font-bold opacity-0 text-3xl gap-10"}>
        <ScrollLink onClick={() => setMobileMenu(false)} to="Mint" spy={true} smooth={true} offset={0} duration={600} className="text-white hover:text-zinc-300 active:text-zinc-400 transition-all cursor-pointer">mint</ScrollLink>
        <ScrollLink onClick={() => setMobileMenu(false)} to="About" spy={true} smooth={true} offset={0} duration={600} className="text-white hover:text-zinc-300 active:text-zinc-400 transition-all cursor-pointer">about</ScrollLink>
        <ScrollLink onClick={() => setMobileMenu(false)} to="Faq" spy={true} smooth={true} offset={0} duration={600} className="text-white hover:text-zinc-300 active:text-zinc-400 transition-all cursor-pointer">faq</ScrollLink>
        <div className="mt-10 bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-700 px-5 py-2 text-white rounded-full font-bold transition-all cursor-pointer">
          <Link href="/stake" >Stake</Link>
        </div>
      </div>
    </div>
    </div>
  )
}
  