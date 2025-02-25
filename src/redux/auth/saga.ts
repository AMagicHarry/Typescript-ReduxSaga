import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// apicore
import { setAuthorization } from "@/helpers/api/apiCore";

// helpers
import {
  login as loginApi,
  signup as signupApi,
  getAccount as getAccountApi,
  logout as logoutApi
} from "@/helpers/api/auth";

// actions
import { authApiResponseSuccess, authApiResponseError } from "./actions";

// constants
import { AuthActionTypes } from "./constants";

interface UserData {
  payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
    remember: boolean;
  };
  type: string;
}

function* login({
  payload: { email, password, remember }
}: UserData): SagaIterator {
  try {
    const response = yield call(loginApi, { email, password, remember });
    const tokens = response.data;
    setAuthorization(tokens);
    yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, tokens.accessToken));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
    setAuthorization(null);
  }
}

function* signup({ payload }: UserData): SagaIterator {
  try {
    const response = yield call(signupApi, payload);
    const user = response.data;
    yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
    setAuthorization(null);
  }
}

function* logout(): SagaIterator {
  try {
    yield call(logoutApi);
    setAuthorization(null);
    yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
  }
}

function* getAccount(): SagaIterator {
  try {
    const response = yield call(getAccountApi);
    const user = response.data;
    yield put(authApiResponseSuccess(AuthActionTypes.GET_ACCOUNT, user));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.GET_ACCOUNT, error));
    setAuthorization(null);
  }
}

export function* watchLoginUser() {
  yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchGetAccount() {
  yield takeEvery(AuthActionTypes.GET_ACCOUNT, getAccount);
}

export function* watchSignup(): any {
  yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}

export function* watchLogout() {
  yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}


function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchGetAccount),
  ]);
}

export default authSaga;
