import { createSlice } from '@reduxjs/toolkit';

import { UserDetail } from '@/shared/models/authen';
import { setLogoutState } from '@/shared/reducers/states/authentication';
import { Storage } from '@/shared/utils';

const Local = Storage.local.get('currency_currencyView') ? Storage.local.get('currency_currencyView') : 'crypto';

export interface UserState {
  UserDetail: UserDetail | null;
  CurrencyView: string;
  totalBalance: number;
  gameToken: string | null;
  coinId: number;
  isPlayingGame: boolean | null;
}

const initialState: UserState = {
  UserDetail: null,
  CurrencyView: Local,
  totalBalance: 0,
  gameToken: null,
  coinId: 0,
  isPlayingGame: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfileState: (state, action) => {
      state.UserDetail = action.payload;
    },

    setTotalBalanceState: (state, action) => {
      state.totalBalance = action.payload;
    },

    setCurrencyView: (state, action) => {
      state.CurrencyView = action.payload;
      Storage.local.set('currency_currencyView', action.payload);
    },

    setCoinToken: (state, action) => {
      state.gameToken = action.payload;
    },

    setCoinId: (state, action) => {
      state.coinId = action.payload;
    },

    setIsPlayingGame: (state, action) => {
      state.isPlayingGame = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setLogoutState, () => initialState);
  },
});

export const { setUserProfileState, setCurrencyView, setTotalBalanceState, setCoinToken, setCoinId, setIsPlayingGame } =
  UserSlice.actions;

export const userReducer = UserSlice.reducer;
