import { useState } from 'react'
import Navbar from './components/Header/Navbar'
import Footer from './components/Footer/Footer'
function App() {
  

  return (
    <div className='flex flex-col justify-between h-screen bg-red-100'>
    <Navbar/>
    <Footer/>
    </div>
  
  )
}

export default App
