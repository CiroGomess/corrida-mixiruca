;import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import Kit from './components/Kit';
import Gallery from './components/Gallery';
import Registration from './components/Registration';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <Kit />
        <Gallery />
        <Registration />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;