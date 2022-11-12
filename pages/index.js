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
    <div>
      <Head>
        <title>Gurts</title>
        <meta name="description" content="Gurts webpage"/>
        <link rel="icon" href="/favicon.ico"/>
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
