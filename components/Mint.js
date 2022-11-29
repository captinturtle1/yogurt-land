import Wave from '../public/wave.svg';

export default function Navbar() {
  return (
    <div id="Mint" className="relative h-[1100px] grid grid-cols-1 lg:grid-cols-3">
      <svg className="absolute w-screen h-[1080px] fill-pink-200 z-[1] drop-shadow-[0px_-10px_10px_rgba(0,0,0,0.25)]"><Wave/></svg>
      <div className="relative col-span-1 z-[2]">
          <img src="bgyogurtformint2.png" className="absolute bottom-10 left-16 w-[600px] hidden lg:block"/>
      </div>
      <div className="col-span-2 flex z-[2]">
        <div className="bg-white grow h-[600px] my-0 lg:my-auto mx-10 lg:mx-40 rounded-3xl drop-shadow-xl flex flex-col">
          <img src="strawberry.png" className="absolute w-16 bottom-16 right-16 animate-wiggle"/>
          <div className="text-black mx-auto font-bold text-2xl xl:text-5xl m-auto animate-bounce">Mint coming soon!</div>
        </div>
      </div>
    </div>
  )
}
  