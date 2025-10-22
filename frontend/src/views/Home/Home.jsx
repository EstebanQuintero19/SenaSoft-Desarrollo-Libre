import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Home;
