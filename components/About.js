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
      <div className="my-auto flex gap-10 p-10 lg:p-0 z-[2]">
        <div className="top-[120px] right-0 w-2 h-96 bg-pink-200 rounded-full "></div>
        <div>
          <div className="text-4xl lg:text-5xl font-bold my-5 flex">About</div>
          <div className="w-auto max-w-[500px] text-sm lg:text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum tincidunt lectus luctus vestibulum. Donec mollis nisl nec elit vestibulum, ut rutrum purus aliquet. Donec aliquet felis id odio porta sollicitudin. Fusce ac quam finibus, tincidunt sapien id, condimentum mauris. Suspendisse turpis magna, pretium sed libero sed, hendrerit viverra odio. Donec auctor nisi turpis, ac blandit quam maximus quis. Nam vel sem porta, sagittis ante sit amet, consectetur tellus. Phasellus arcu erat, elementum ut ante id, luctus efficitur justo.</div>
        </div>
      </div>
    </div>
  )
}