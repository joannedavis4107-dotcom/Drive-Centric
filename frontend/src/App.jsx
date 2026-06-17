import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import CarDetails from './pages/CarDetails'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import CarCard from './components/CarCard'
import Adashboard from './pages/Adashboard'
import Dashboard from './pages/Dashboard'

 const HomeWithNavigation =() => {
  const navigate = useNavigate();
  return <Home onNavigateToBooking={() => navigate('/booking')}/>
 };

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
      <NavBar/>
      <Routes>
         <Route path='/' element={<HomeWithNavigation/>}/> 
         <Route path='/admin' element = {<Adashboard/>}/>
         <Route path='/booking' element={<Dashboard/>}/>
         <Route path='/auth' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
