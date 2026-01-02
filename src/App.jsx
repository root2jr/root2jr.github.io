import Hero from './components/Hero';
import Navigation from './components/Navigation';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import About from './components/About';
import NotFound from './components/NotFound';
import ProjectDetail from './components/ProjectDetail';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';


function Home() {
  const phoneNumber = "919342772002";
  const logoRef = useRef(null);
  const message = "*Portfolio Inquiry*\n\nHi! I'm reaching out from your portfolio. I'd love to connect.";
  useEffect(() => {
    gsap.fromTo(logoRef.current, {y: 100, opacity:0},{y:0, opacity:1,ease: "power3.out", delay: 0.5})
  },[])
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  return (
    <div className="app">
      <Navigation />
      <Hero />
      <Skills />
      <Projects />
      <About />
      <Contact />
      <Footer />
      <a href={whatsappUrl}><IoLogoWhatsapp ref={logoRef} className='whatsapp-logo' size={50} style={{position: "fixed", bottom: 20, right: 20, padding: 10, borderRadius: "50%", background: "#25D366", zIndex: 99, textDecoration: "none", boxShadow: "0px 4px 10px rgba(0,0,0,0.3)"}} color="white" /></a>
    </div>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
