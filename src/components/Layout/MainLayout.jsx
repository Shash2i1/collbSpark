import React, { useState, useEffect } from 'react'
import Navbar from '../Header/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import authService from '../../appwrite/authService'
import { useDispatch } from 'react-redux'
import { login, logout } from '../../store/authSlice'
import { ScrollToTopButton } from '../index'


function MainLayout() {

  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !isLoading ? (
    <div className="min-h-screen flex flex-wrap content-between">
      <div className='w-full min-h-screen flex flex-col justify-between'>
        <div className='w-full h-full sticky top-0 z-50'>
          <Navbar/>
        </div>
        <main className="flex-grow w-full">
          <Outlet />
          <ScrollToTopButton />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default MainLayout