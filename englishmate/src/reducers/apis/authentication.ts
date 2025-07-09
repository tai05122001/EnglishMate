import { createApi } from '@reduxjs/toolkit/query/react';

import { GATEWAY_URL } from '@/shared/constants';
import {
  ChangePasswordRequest,
  ChangePhoneRequest,
  ConfirmRegisterOauth,
  LoginMFARequest,
  LoginRequest,
  LoginResponse,
  LoginTokenRequest,
  RegisterExistRequest,
  RegisterExistResponse,
  RegisterRequest,
  ResetPasswordConfirm,
  UserDetail,
  UserSession,
} from '@/shared/models/authen';
import { PageableRequest, PageableResponse } from '@/shared/models/pageable';
import { fetchAuthBaseQuery } from './common';

export const authenticationApi = createApi({
  reducerPath: 'authenticationApi',

  baseQuery: fetchAuthBaseQuery(`${GATEWAY_URL}/user`),
  tagTypes: ['Authentication'],

  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterRequest>({
      query: (body) => ({
        url: '/api/common/v1/authentications/register',
        method: 'POST',
        body,
      }),
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/api/common/v1/authentications/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Authentication'],
    }),

    loginWithToken: builder.mutation<LoginResponse, LoginTokenRequest>({
      query: (body) => ({
        url: '/api/common/v1/authentications/login/login-token',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Authentication'],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/api/public/v1/authentications/logout',
        method: 'DELETE',
      }),
    }),

    verifyEmail: builder.mutation<void, { token: string }>({
      query: (body) => ({
        url: '/api/common/v1/authentications/register/confirm',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Authentication'],
    }),

    checkEmailExist: builder.mutation<boolean, { email: string }>({
      query: (body) => ({
        url: '/api/common/v1/authentications/check-email-exist',
        method: 'POST',
        body,
      }),
    }),

    checkUserNameExist: builder.mutation<boolean, { username: string }>({
      query: (body) => ({
        url: '/api/common/v1/authentications/check-username-exist',
        method: 'POST',
        body,
      }),
    }),

    checkRegisterExist: builder.mutation<RegisterExistResponse, RegisterExistRequest>({
      query: (body) => ({
        url: '/api/common/v1/authentications/check-exist-register',
        method: 'POST',
        body,
      }),
    }),

    checkReferralExist: builder.mutation<boolean, { referralCode: string }>({
      query: (body) => ({
        url: '/api/common/v1/authentications/check-referral-exist',
        method: 'POST',
        body,
      }),
    }),

    confirmLogin: builder.mutation<LoginResponse, { token: string }>({
      query: (body) => ({
        url: '/api/common/v1/authentications/oauth/confirm',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Authentication'],
    }),

    registerOauth: builder.mutation<LoginResponse, ConfirmRegisterOauth>({
      query: (body) => ({
        url: '/api/common/v1/authentications/register/oauth',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Authentication'],
    }),

    checkDisplayNameExist: builder.mutation<boolean, { displayName: string }>({
      query: (body) => ({
        url: '/api/common/v1/authentications/check-display-name-exist',
        method: 'POST',
        body,
      }),
    }),

    resetPassword: builder.mutation<void, { email: string }>({
      query: (body) => ({
        url: '/api/common/v1/authentications/reset-password',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Authentication'],
    }),

    confirmResetPassword: builder.mutation<LoginResponse, ResetPasswordConfirm>({
      query: (body) => ({
        url: '/api/common/v1/authentications/reset-password/confirm',
        method: 'PATCH',
        body,
      }),
    }),

    changePassword: builder.mutation<void, ChangePasswordRequest>({
      query: (body) => ({
        url: 'api/public/v1/authentications/change-password',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Authentication'],
    }),

    getProfile: builder.query<UserDetail, void>({
      query: () => ({ url: '/api/public/v1/users/me', method: 'GET' }),
      providesTags: ['Authentication'],
    }),

    changeEmail: builder.mutation<void, { email: string }>({
      query: (body) => ({
        url: '/api/public/v1/authentications/change-email',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Authentication'],
    }),

    resendActiveEmail: builder.mutation<void, void>({
      query: () => ({
        url: '/api/public/v1/authentications/resend-activated-email',
        method: 'POST',
      }),
    }),

    changePhone: builder.mutation<void, ChangePhoneRequest>({
      query: (body) => ({
        url: '/api/public/v1/authentications/change-phone',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Authentication'],
    }),

    loginMFA: builder.mutation<LoginResponse, LoginMFARequest>({
      query: (body) => ({
        url: '/api/common/v1/authentications/login/login-two-fa',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Authentication'],
    }),

    confirmMFA: builder.mutation<{ enableTwoFa: boolean }, { confirmTwoFaToken: string }>({
      query: (body) => ({
        url: '/api/common/v1/authentications/confirm-two-fa',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Authentication'],
    }),

    onOffMFA: builder.mutation<void, { password?: string; code: string }>({
      query: (body) => ({
        url: '/api/public/v1/authentications/on-off-two-factor',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Authentication'],
    }),

    getSessions: builder.query<PageableResponse<UserSession>, PageableRequest>({
      query: (pageRequest) => ({
        url: `api/public/v1/users/user-session?page=${pageRequest.page}&size=${pageRequest.size}&filter=${pageRequest.filter}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
      transformResponse: (response: unknown, meta) => new PageableResponse(response, meta),
    }),

    deleteSession: builder.mutation<void, { sessionId: string }>({
      query: (body) => ({
        url: `/api/public/v1/users/user-session/${body.sessionId}`,
        method: 'DELETE',
      }),
    }),

    changeLanguage: builder.mutation<void, { language: string }>({
      query: (body) => ({
        url: '/api/public/v1/users/language',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Authentication'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLoginWithTokenMutation,
  useLogoutMutation,
  useVerifyEmailMutation,
  useCheckUserNameExistMutation,
  useCheckEmailExistMutation,
  useCheckRegisterExistMutation,
  useCheckReferralExistMutation,
  useConfirmLoginMutation,
  useRegisterOauthMutation,
  useCheckDisplayNameExistMutation,
  useResetPasswordMutation,
  useConfirmResetPasswordMutation,
  useChangePasswordMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useChangeEmailMutation,
  useResendActiveEmailMutation,
  useChangePhoneMutation,
  useLoginMFAMutation,
  useConfirmMFAMutation,
  useOnOffMFAMutation,
  useGetSessionsQuery,
  useDeleteSessionMutation,
  useChangeLanguageMutation,
} = authenticationApi;
