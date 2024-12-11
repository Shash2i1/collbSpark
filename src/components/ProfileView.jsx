import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import { updateProfileUrl } from '../store/authSlice';
import ProjectServices from '../appwrite/ProjectServices';

const ProfileView = ({ size = 40, altText = 'Profile Picture' }) => {
  const dispatch = useDispatch();
  const profileUrl = useSelector((state) => state.auth.profileUrl); 
  const fileId = useSelector((state) => state.auth.userData?.userData?.$id); 
  const [imageError, setImageError] = useState(false);

  
  const fetchProfileImage = async () => {
    if (fileId) {
      try {
        const previewUrl = await ProjectServices.getProfilePreview(fileId);
        dispatch(updateProfileUrl(previewUrl)); 
        setImageError(false); 
      } catch (error) {
        console.error('Error fetching profile image:', error);
        setImageError(true); 
      }
    } else {
      setImageError(true); 
    }
  };

  
  useEffect(() => {
    fetchProfileImage();
  }, [fileId, profileUrl]); 

  const handleImageError = () => {
    setImageError(true); 
  };

  return (
    <div
      className="flex items-center justify-center bg-gray-200 rounded-full overflow-hidden border border-gray-300"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {!imageError && profileUrl ? (
        <img
          src={`${profileUrl}?t=${Date.now()}`} 
          alt={altText}
          className="w-full h-full object-cover rounded-full"
          onError={handleImageError}
        />
      ) : (
        <Icon icon="fa-solid:user" width={size * 0.6} height={size * 0.6} style={{ color: '#000' }} />
      )}
    </div>
  );
};

export default ProfileView;
