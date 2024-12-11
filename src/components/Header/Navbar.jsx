import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, LogoText, ProfileView, Logo, CoinTracker, SearchBox } from '../index';
import LogoutBtn from './LogoutBtn';
import { Icon } from '@iconify/react';

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const authStatus = useSelector((state) => state.auth.authStatus);
  const userData = useSelector((state) => state.auth.userData);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {/* Navbar */}
      <div className="w-full h-auto p-4 bg-[#021526] flex flex-wrap items-center justify-between sm:flex-row sm:items-center">
        {/* Logo */}
        <div className="flex items-center w-full justify-between sm:w-auto">
          <Link to="/">
            <LogoText className="text-white text-2xl md:text-2xl sm:text-base" />
          </Link>
          {authStatus && (
            <div className="sm:hidden cursor-pointer" onClick={toggleModal}>
              <ProfileView imageUrl="" />
            </div>
          )}
        </div>


        {/* SearchBox */}
        {authStatus && (
          <div className="w-full mt-4 sm:mt-0 sm:flex-1 sm:max-w-lg sm:mx-4">
            <SearchBox />
          </div>
        )}
        {/* ProfileView or Login */}
        {authStatus ? (
          <div className="hidden sm:block cursor-pointer" onClick={toggleModal}>
            <ProfileView imageUrl="" />
          </div>
        ) : (
          <Link to="/auth/login" className="text-white ml-auto">
            <Button className="w-full text-center inline-block px-6 py-2 duration-200 hover:bg-blue-500 hover:text-white text-gray-100 rounded-full font-righteous">
              Login
            </Button>
          </Link>
        )}
      </div>

      {/* Modal */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-gray-200 shadow-lg z-50 transform transition-transform duration-500 ${isModalOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Modal Header */}
          <div className="flex justify-between items-center w-full p-4 border-b border-gray-300">
            <div className="flex items-center">
              <Logo className="w-6 h-6" />
              <LogoText />
            </div>
            <button onClick={toggleModal}>
              <img src="\src\assets\closeLogo.png" alt="" className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="mt-4 flex flex-col items-center px-4">
            <ProfileView size={60} altText="User Profile" />
            <h3 className="text-xl font-semibold mt-2 text-center">
              {userData?.userData.name || 'User Name'}
            </h3>
            <p className="text-sm text-gray-600">{userData?.userData.email || 'user@example.com'}</p>
          </div>

          {/* Menu Links */}
          <div className="mt-6 flex-grow px-4 space-y-4">
            <Link to="/home" className="flex items-center text-gray-800 hover:text-blue-500">
              <Icon icon="fluent:home-16-filled" width="24" height="24" className="mr-3" />
              Home
            </Link>
            <Link to="/profile" className="flex items-center text-gray-800 hover:text-blue-500">
              <Icon icon="iconamoon:profile-fill" width="24" height="24" className="mr-3" />
              My Profile
            </Link>
            <Link to="/dashboard" className="flex items-center text-gray-800 hover:text-blue-500">
              <Icon icon="mage:dashboard-chart-fill" width="24" height="24" className="mr-3" />
              Dashboard
            </Link>
            <Link to="/myprojects" className="flex items-center text-gray-800 hover:text-blue-500">
              <Icon icon="bi:folder-fill" width="24" height="24" className="mr-3" />
              My Projects
            </Link>
            <Link to="/saved" className="flex items-center text-gray-800 hover:text-blue-500">
              <Icon icon="ic:baseline-save-alt" width="24" height="24" className="mr-3" />
              Saved
            </Link>
            <Link to="/subscriptions" className="flex items-center text-gray-800 hover:text-blue-500">
              <Icon icon="jam:crown-f" width="24" height="24" className="mr-3" />
              Subscriptions
            </Link>
          </div>

          {/* Logout Button at the Bottom */}
          <div className="w-full p-4 border-t border-gray-300 flex items-center justify-center">
            <LogoutBtn
              closeModal={toggleModal}
              className="w-full text-center inline-block px-6 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 duration-200"
            />
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 opacity-100 transition-opacity duration-500"
          onClick={toggleModal}
        ></div>
      )}
    </>
  );
}

export default Navbar;
