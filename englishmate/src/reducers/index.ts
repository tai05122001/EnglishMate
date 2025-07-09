import { assetApi } from '@/shared/reducers/apis/asset';
import { gameApi } from '@/shared/reducers/apis/game';
import { merchantApi } from '@/shared/reducers/apis/kyc';
import { notificationApi } from '@/shared/reducers/apis/notification';
import { walletApi } from '@/shared/reducers/apis/wallet';
import { withdrawApi } from '@/shared/reducers/apis/withdraw';
import { AppDispatch } from '@/store';
import { authenticationApi } from './apis/authentication';
import { authenticationReducer, coinMarketReducer, CommonReducer, userReducer } from './states';

export * from './apis';
export * from './states';

export const sharedReducers = {
  authentication: authenticationReducer,
  user: userReducer,
  coinMarket: coinMarketReducer,
  common: CommonReducer,
  [authenticationApi.reducerPath]: authenticationApi.reducer,
  [merchantApi.reducerPath]: merchantApi.reducer,
  [walletApi.reducerPath]: walletApi.reducer,
  [assetApi.reducerPath]: assetApi.reducer,
  [withdrawApi.reducerPath]: withdrawApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [gameApi.reducerPath]: gameApi.reducer,
};

export const middlewares = [
  authenticationApi.middleware,
  merchantApi.middleware,
  walletApi.middleware,
  assetApi.middleware,
  withdrawApi.middleware,
  notificationApi.middleware,
  gameApi.middleware,
];

export const api = {
  util: {
    resetApiState: () => (dispatch: AppDispatch) => {
      dispatch(authenticationApi.util.resetApiState());
      dispatch(merchantApi.util.resetApiState());
      dispatch(walletApi.util.resetApiState());
      dispatch(assetApi.util.resetApiState());
      dispatch(withdrawApi.util.resetApiState());
      dispatch(notificationApi.util.resetApiState());
      dispatch(gameApi.util.resetApiState());
    },
  },
};
