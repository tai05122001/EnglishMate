/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query';
import Cookies from 'js-cookie';

import { COOKIE_USER_LOGIN } from '@/shared/constants';
import { setLogoutState } from '@/shared/reducers/states';

export const baseQuery = (baseUrl: string) =>
  fetchBaseQuery({
    baseUrl,
    timeout: 10000,
    credentials: 'include',
  });

export const fetchAuthBaseQuery =
  (baseUrl: string) => async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    const result = await baseQuery(baseUrl)(args, api, extraOptions);

    if (result.error?.status === 401) {
      api.dispatch(setLogoutState());
      Cookies.remove(COOKIE_USER_LOGIN);
    }

    if (result.error?.status === 403) {
      api.dispatch(setLogoutState());
      Cookies.remove(COOKIE_USER_LOGIN);
    }
    return result;
  };

export const getErrorMessage = (error: any) => {
  const message = error?.data?.code || error?.data?.error || error?.data || error?.error || error?.message || error;

  if (typeof message === 'string' && message.startsWith('error.login.failed.locked.')) {
    return 'error.login.failed.locked.';
  }

  if (typeof message === 'object') {
    return message[0];
  }

  return message;
};

export const getErrorCode = (error: any): { title: string; message: string } => {
  const message = error?.data?.code || error?.data?.error || error?.data || error?.error || error?.message || error;

  if (typeof message === 'object') {
    return message[0];
  }

  return { title: `${message}-title`, message };
};

export const getErrorStatus = (error: any) => {
  return error?.status || error?.error?.status || error;
};
