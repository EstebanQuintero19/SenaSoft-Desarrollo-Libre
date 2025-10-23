import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Home from './views/Home/Home'
import Discover from './views/Discover/Discover'
import FlightResults from './views/FlightResults/FlightResults'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import PassengerForm from '../PassengerForm';
import './App.css'

function LoginPage() {
  const navigate = useNavigate()
  return <Login onNavigate={() => navigate('/register')} />
}

function RegisterPage() {
  const navigate = useNavigate()
  return <Register onNavigate={() => navigate('/login')} />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/flights" element={<FlightResults />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/passenger" element={<PassengerForm />} />
      </Routes>
    </Router>
  )
}

export default App
