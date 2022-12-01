import Wave from '../public/wave3.svg';

export default function About() {
  return (
    <div id="About" className="relative h-[900px] grid grid-cols-1 lg:grid-cols-2 z-[3]">
      <svg className="absolute w-screen h-[1080px] fill-blue-500 top-[-180px] left-0 drop-shadow-[0px_-10px_10px_rgba(0,0,0,0.25)]"><Wave/></svg>
      <img src="milkbox.png" className="absolute w-12 lg:w-24 top-96 lg:top-32 right-16 lg:right-32 animate-wiggle scroll-smooth"/>
      <div className="flex mx-10 lg:mx-24 my-10 lg:my-36">
        <div className="relative w-96 lg:w-full mx-auto">
          <img src="Ex2.png" className="absolute min-w-[200px] top-[20%] lg:top-[20%] left-[30%] lg:left-[45%] w-[25%] lg:w-[50%] max-w-[400px] rounded-full drop-shadow-lg"/>
          <img src="Ex1.png" className="absolute min-w-[150px] top-[0%] left-[14%] lg:left-[20%] w-[25%] lg:w-[50%] max-w-[400px] rounded-full drop-shadow-lg"/>
          <img src="Ex3.png" className="absolute min-w-[150px] top-[60%] lg:top-[45%] left-[15%] w-[25%] lg:w-[50%] max-w-[400px] rounded-full drop-shadow-lg"/>
        </div>
      </div>
      <div className="mx-auto lg:mx-0 my-auto flex gap-10 p-10 lg:p-0 z-[2]">
        <div className="w-2 h-[400px] lg:h-[450px] bg-pink-200 rounded-full "></div>
        <div>
          <div className="text-4xl lg:text-5xl font-bold my-5 flex text-white">About</div>
          <div className="w-auto max-w-[500px] text-sm lg:text-lg text-white">The Gurts is an expansion to the already created YogurtVerse, and will be the key to unlock access inside. YogurtVerse is an alpha group consisting of 321 highly skilled NFT traders. The Gurts, will act as a pfp, and a token that you must stake to earn access to different parts of the YogurtVerse discord. Over time by staking, and contributing to the community, you will rank up inside of the discord, and be able to unlock different sections that will lead to high tier alpha, connections, and information. Our goal is to help and welcome, anyone in web3, to YogurtVerse. Whether that is brand new participants, experienced veterans, or wherever you may fall in between, we want YogurtVerse to serve as a home for all walks of life.</div>
        </div>
      </div>
    </div>
  )
}