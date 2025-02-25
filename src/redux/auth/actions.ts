import { AuthActionTypes } from "./constants";

export interface AuthActionType {
  type:
  | AuthActionTypes.API_RESPONSE_SUCCESS
  | AuthActionTypes.API_RESPONSE_ERROR
  | AuthActionTypes.LOGIN_USER
  | AuthActionTypes.LOGOUT_USER
  | AuthActionTypes.RESET
  | AuthActionTypes.SIGNUP_USER
  | AuthActionTypes.GET_ACCOUNT;
  payload: {} | string;
}

interface UserData {
  id: number;
  name: string;
  phone: string;
  email: string;
  avatar: string;
}

export const authApiResponseSuccess = (
  actionType: string,
  data: UserData | {}
): AuthActionType => ({
  type: AuthActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

export const authApiResponseError = (
  actionType: string,
  error: string
): AuthActionType => ({
  type: AuthActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const loginUser = (email: string, password: string, remember: boolean): AuthActionType => ({
  type: AuthActionTypes.LOGIN_USER,
  payload: { email, password, remember },
});

export const logoutUser = (): AuthActionType => ({
  type: AuthActionTypes.LOGOUT_USER,
  payload: {},
});

export const getAccount = (): AuthActionType => ({
  type: AuthActionTypes.GET_ACCOUNT,
  payload: {},
});

export const signupUser = (data: { name: string; email: string; phone?: string; password: string }): AuthActionType => ({
  type: AuthActionTypes.SIGNUP_USER,
  payload: data,
});

export const resetAuth = (): AuthActionType => ({
  type: AuthActionTypes.RESET,
  payload: {},
});
