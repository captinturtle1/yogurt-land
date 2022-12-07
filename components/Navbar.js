import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { SiDiscord } from 'react-icons/si';
import { BsTwitter } from 'react-icons/bs';
import Link from 'next/link'

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div>
    <div className="z-[10] fixed top-0 w-screen flex h-16 bg-white text-black select-none">
      <ScrollLink to="Landing" spy={true} smooth={true} offset={0} duration={600} className="flex absolute h-16 ">
          <img src="YV_LOGO2.png" className="h-10 my-auto ml-16 cursor-pointer"/>
          <div className="font-bold my-auto text-2xl cursor-pointer">Gurts</div>
      </ScrollLink>
      <div className="m-auto hidden lg:flex gap-5 font-bold">
          <ScrollLink to="Mint" spy={true} smooth={true} offset={0} duration={600} className="text-black hover:text-zinc-500 active:text-zinc-600 transition-all cursor-pointer">Mint</ScrollLink>
          <ScrollLink to="About" spy={true} smooth={true} offset={0} duration={600} className="text-black hover:text-zinc-500 active:text-zinc-600 transition-all cursor-pointer">About</ScrollLink>
          <ScrollLink to="Faq" spy={true} smooth={true} offset={0} duration={600} className="text-black hover:text-zinc-500 active:text-zinc-600 transition-all cursor-pointer">Faq</ScrollLink>
      </div>
      <div className="absolute right-0 h-16 hidden lg:flex mr-16 gap-8">
        <a href="https://twitter.com/YogurtVerse" className="flex">
          <BsTwitter className="m-auto cursor-pointer text-3xl text-[#765050] hover:text-[#8f6464] active:text-[#5e3f3f] transition-all"/>
        </a>
        <a href="https://discord.com/invite/yogurtverse" className="flex">
          <SiDiscord className="m-auto cursor-pointer text-3xl text-[#765050] hover:text-[#8f6464] active:text-[#5e3f3f] transition-all"/>
        </a>
        <Link href="/dashboard">
          <div className="m-auto bg-[#765050] hover:bg-[#8f6464] active:bg-[#5e3f3f] px-5 py-2 text-white rounded-xl font-bold transition-all cursor-pointer">
            <a>Dashboard</a>
          </div>
        </Link>
      </div>
      <div className=" flex lg:hidden">
          <AiOutlineMenu onClick={() => setMobileMenu(!mobileMenu)} className={mobileMenu ? "absolute right-0 h-16 mr-16 cursor-pointer text-2xl invisible opacity-0 transition-all" : "absolute right-0 h-16 mr-16 cursor-pointer text-2xl visible opacity-100 transition-all"}/>
          <AiOutlineClose onClick={() => setMobileMenu(!mobileMenu)} className={mobileMenu ? "absolute right-0 h-16 mr-16 cursor-pointer text-2xl visible opacity-100 transition-all" : "absolute right-0 h-16 mr-16 cursor-pointer text-2xl invisible opacity-0 transition-all"}/>
      </div>
    </div>
    <div className={mobileMenu ? "z-[9] fixed h-screen w-screen bg-[#8f6464] opacity-100 transition-all flex visible lg:invisible" : "z-[9] fixed h-screen w-screen bg-[#8f6464] opacity-0 transition-all invisible"}>
      <div className={mobileMenu ? "m-auto flex flex-col text-center font-bold opacity-100 text-3xl gap-10" : "m-auto flex flex-col text-center font-bold opacity-0 text-3xl gap-10"}>
        <ScrollLink onClick={() => setMobileMenu(false)} to="Mint" spy={true} smooth={true} offset={0} duration={600} className="text-white hover:text-zinc-300 active:text-zinc-400 transition-all cursor-pointer">Mint</ScrollLink>
        <ScrollLink onClick={() => setMobileMenu(false)} to="About" spy={true} smooth={true} offset={0} duration={600} className="text-white hover:text-zinc-300 active:text-zinc-400 transition-all cursor-pointer">About</ScrollLink>
        <ScrollLink onClick={() => setMobileMenu(false)} to="Faq" spy={true} smooth={true} offset={0} duration={600} className="text-white hover:text-zinc-300 active:text-zinc-400 transition-all cursor-pointer">Faq</ScrollLink>
        <div className="flex gap-5 m-auto">
          <a href="https://twitter.com/YogurtVerse" className="flex">
            <BsTwitter className="m-auto cursor-pointer text-3xl text-zinc-800 hover:text-zinc-900 active:text-zinc-700 transition-all"/>
          </a>
          <a href="https://discord.com/invite/yogurtverse" className="flex">
            <SiDiscord className="m-auto cursor-pointer text-3xl text-zinc-800 hover:text-zinc-900 active:text-zinc-700 transition-all"/>
          </a>
        </div>
        <Link href="/dashboard">
          <div className="bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-700 px-5 py-2 text-white rounded-xl font-bold transition-all cursor-pointer">
            <a>Dashboard</a>
          </div>
        </Link>
      </div>
    </div>
    </div>
  )
}
  