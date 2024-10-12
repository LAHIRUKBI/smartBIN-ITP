import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    }
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
