import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import './Home.css';
import Features from '../../components/Features/Features';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <Features/>
      <Footer />
    </div>
  );
};



export default Home;
