import React from 'react'
import logo from '../assets/logo.png'
function Logo({className}) {
  return (
    <div>
        <img src={logo} alt="logo" className={className} />
    </div>
  )
}

export default Logo