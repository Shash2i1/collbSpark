import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  authStatus: false,
  profileUrl: '', 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.userData = action.payload;
      state.authStatus = true;
    },
    logout(state) {
      state.userData = null;
      state.authStatus = false;
      state.profileUrl = ''; 
    },
    updateProfileUrl(state, action) {
      state.profileUrl = action.payload; 
    },
  },
});

export const { login, logout, updateProfileUrl } = authSlice.actions;
export default authSlice.reducer;
