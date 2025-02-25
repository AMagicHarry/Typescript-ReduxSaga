import { getAccessTokenFromStorage } from "@/helpers/api/apiCore";
import { AuthActionTypes } from "./constants";

const INIT_STATE = {
  loading: false,
  token: getAccessTokenFromStorage()
};

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface State {
  user?: UserData;
  token?: string;
  loading: boolean;
  error?: string;
  isUserLoggedIn?: boolean;
}

const Auth = (state: State = INIT_STATE, action: any): any => {
  switch (action.type) {
    case AuthActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case AuthActionTypes.LOGIN_USER: {
          return {
            ...state,
            token: action.payload.data,
            loading: false,
          };
        }
        case AuthActionTypes.SIGNUP_USER: {
          return {
            ...state,
            registerSuccess: true,
            loading: false,
          };
        }
        case AuthActionTypes.LOGOUT_USER: {
          return {
            ...state,
            isUserLoggedIn: false,
            user: undefined,
            token: undefined,
            loading: false,
          };
        }
        case AuthActionTypes.GET_ACCOUNT: {
          return {
            ...state,
            user: action.payload.data,
            isUserLoggedIn: true,
            loading: false,
          };
        }
        default:
          return { ...state };
      }

    case AuthActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case AuthActionTypes.LOGIN_USER: {
          return {
            ...state,
            loginError: action.payload.error,
            token: undefined,
            loading: false,
          };
        }
        case AuthActionTypes.SIGNUP_USER: {
          return {
            ...state,
            registerError: action.payload.error,
            loading: false,
          };
        }
        case AuthActionTypes.GET_ACCOUNT: {
          return {
            ...state,
            user: null,
            loading: false,
            isUserLoggedIn: false,
          };
        }
        case AuthActionTypes.LOGOUT_USER: {
          return {
            ...state,
            isUserLoggedIn: false,
            user: undefined,
            token: undefined,
            loading: false,
          };
        }
        default:
          return { ...state };
      }

    case AuthActionTypes.LOGIN_USER:
      return { ...state, loading: true };
    case AuthActionTypes.LOGOUT_USER:
      return { ...state, loading: true };
    case AuthActionTypes.GET_ACCOUNT:
      return { ...state, loading: true };
    case AuthActionTypes.RESET:
      return {
        ...state,
        registerError: false,
        registerSuccess: false,
        loginError: false,
        loading: false,
      };
    default:
      return { ...state };
  }
};

export default Auth;
