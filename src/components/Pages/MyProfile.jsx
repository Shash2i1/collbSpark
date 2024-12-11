import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProjectServices from '../../appwrite/ProjectServices';
import { updateProfileUrl } from '../../store/authSlice';
import { Input, Loading, ProfileView , Notification} from '../../components/index';
import imageCompression from 'browser-image-compression';
import { Icon } from '@iconify/react';

function MyProfile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const fileId = userData?.userData?.$id;
  const name = userData?.userData?.name || "N/A";
  const email = userData?.userData?.email || "N/A";
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Reference to the hidden file input
  const fileInputRef = useRef(null);

  // Compress image before uploading
  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
    };
    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error('Error during image compression:', error);
      return file;
    }
  };

  // Handle the profile image change
  const changeProfile = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    setIsLoading(true);
    setSuccess(false);
    let compressedFile = await compressImage(imageFile);

    if (!compressedFile) return;

    compressedFile = new File([compressedFile], imageFile.name, { type: imageFile.type });

    try {
      const existingPreview = await ProjectServices.getpreviewConfirmation(fileId);
      if (existingPreview) {
        await ProjectServices.deleteFile(fileId);
      }

      const fileResp = await ProjectServices.uploadProfilePic(fileId, compressedFile);

      if (fileResp) {
        const newPreview = await ProjectServices.getProfilePreview(fileId);
        dispatch(updateProfileUrl(newPreview));
      }
    } catch (error) {
      console.error('Error changing profile picture:', error);
    } finally {
      setIsLoading(false);
      setSuccess(true);
    }
  };

  // Trigger the hidden file input
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-[#021526] to-gray-500 flex flex-col items-center justify-center overflow-hidden">
      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        <ProfileView size={120} altText="User Profile" />
        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          className="hidden"
          ref={fileInputRef} // Attach the ref here
          onChange={changeProfile}
        />
        <button
          onClick={handleButtonClick} // Trigger the hidden input
          className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-full shadow-md text-sm hover:bg-blue-600 focus:outline-none"
        >
          <Icon icon="mdi:camera" className="mr-2" width="16" />
          Change Profile Pic
        </button>
      </div>

      {/* User Info */}
      <div className="w-full max-w-lg space-y-4 px-4">
        {/* Name */}
        <div>
          <label className="block text-gray-600 text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            readOnly
            className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-600 text-sm font-medium">Email</label>
          <input
            type="text"
            value={email}
            readOnly
            className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>
      </div>

      {/* Change Password Section */}
      <div className="mt-6 w-full max-w-lg px-4">
        <button
          onClick={() => setShowChangePassword(!showChangePassword)}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none"
        >
          Change Password
        </button>
        {showChangePassword && (
          <div className="mt-4 space-y-4 border-t pt-4">
            <div>
              <label className="block text-gray-600 text-sm font-medium">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none"
              />
            </div>
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none">
              Update Password
            </button>
          </div>
        )}
      </div>

      {/* Loading Indicator */}
      <Loading isLoading={isLoading} text="Uploading" />
      {success && <Notification message="Profile changed"/>}
    </div>
  );
}

export default MyProfile;
