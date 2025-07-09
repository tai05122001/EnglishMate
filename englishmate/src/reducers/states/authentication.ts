import { createSlice } from '@reduxjs/toolkit';

import { Storage } from '@/shared/utils';
import { IRootState } from '@/store';

export interface AuthenticationState {
  isAuthenticated: boolean;
  mfaLoginToken?: string;
  identityToken?: string;
}

const initialState: AuthenticationState = {
  isAuthenticated: Storage.local.get('isAuthenticated') || false,
};

export const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setLoginState: (state) => {
      state.isAuthenticated = true;
      Storage.local.set('isAuthenticated', true);
    },

    setIdentityToken: (state, action) => {
      state.identityToken = action.payload;
    },

    setLogoutState: (state) => {
      state.isAuthenticated = false;
      Storage.local.remove('isAuthenticated');
      // window.location.href = '/';
    },
  },
});

export const { setLoginState, setLogoutState, setIdentityToken } = AuthenticationSlice.actions;
export const authenticationReducer = AuthenticationSlice.reducer;

export const selectAuthenticatedDetail = (state: IRootState) => state.authentication.isAuthenticated;
export const selectidentityToken = (state: IRootState) => state.authentication.identityToken;
