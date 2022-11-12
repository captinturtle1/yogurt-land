import Head from 'next/head'
import Link from 'next/link'

export default function Navbar() {
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
        <div className="h-screen bg-[#765050] flex">
            <div className="bg-[#c0a9a9] w-full mx-64 my-32 drop-shadow-xl rounded-3xl grid grid-cols-3">
                <div className="bg-zinc-600 m-10 rounded-xl"></div>
                <div className="bg-zinc-500 m-10 rounded-xl"></div>
                <div className="bg-zinc-400 m-10 rounded-xl"></div>
            </div>
        </div>
      </div>
    )
}