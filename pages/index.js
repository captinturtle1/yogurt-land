import Head from 'next/head'

import Landing from '../components/Landing';
import Navbar from '../components/Navbar';
import Mint from '../components/Mint';
import About from '../components/About';
import ExampleSlide from '../components/ExampleSlide';
import Faq from '../components/Faq';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Head>
        <title>Gurts</title>
        <meta name="description" content="The Gurts NFT homepage."/>
        <link rel="icon" href="/favicon.ico"/>
        <meta property="og:title" content="Gurts" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.yogurtverse.xyz/" />
        <meta property="og:image" content="https://www.yogurtverse.xyz/yvlogoBanner.png" />
        <meta property="og:description" content="The Gurts NFT homepage." />
        <meta name="theme-color" content="#F87171" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Navbar/>
      <Landing/>
      <Mint/>
      <About/>
      <ExampleSlide/>
      <Faq/>
      <Footer/>
    </div>
  )
}
