import React, { useState } from 'react';
import authService from '../../appwrite/authService';
import { useDispatch } from 'react-redux';
import { Loading } from '../index';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice'; // Assuming you have a logout action
import { Icon } from '@iconify/react';

function LogoutBtn({ closeModal, className, ...props }) {
  const [isLoading, setLoader] = useState(false);
  const dispatch = useDispatch(); // Dispatch hook for Redux actions
  const navigate = useNavigate();

  const loggingout = async () => {
    try {
      setLoader(true); // Show loading state
      await authService.logout(); // Ensure logout is successful before dispatching
      dispatch(logout()); // Dispatch the logout action to update Redux state
      navigate('/'); // Navigate to the home page after logout
      closeModal(); // Close the modal after logout
    } catch (error) {
      console.log('Logout error', error);
    } finally {
      setLoader(false); // Stop the loader
    }
  };

  return (
    <button className={`flex items-center justify-center ${className}`} onClick={loggingout}>
      <Icon icon="streamline:logout-1-solid" width="14" height="14"  style={{color: '#fff'}} />
      <span className='ml-1'>Logout</span>
      <Loading isLoading={isLoading} />
    </button>
  );
}

export default LogoutBtn;
