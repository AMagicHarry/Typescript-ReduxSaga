import axios from "axios";

import config from "../../config";
import { store } from "@/redux/store";
import { logoutUser, authApiResponseSuccess } from "@/redux/actions";
import { AuthActionTypes } from "@/redux/auth/constants";

// content type
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.baseURL = config.API_URL;

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) as string
    if (!refreshToken) {
      throw new Error("No refresh token available.");
    }
    const response = await axios.post('/refresh-token', {
      token: refreshToken,
    });
    const tokens = response.data
    setAuthorization(tokens)
    store.dispatch(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, tokens.accessToken))
    return tokens.accessToken
  } catch (error) {
    store.dispatch(logoutUser());
    return null;
  }
};

// intercepting to capture errors
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let message;

    if (error && error.response && error.response.status === 401) {
      if (error.response.config.url !== '/logout') {
        try {
          const newAccessToken = await refreshAccessToken();
          if (!newAccessToken) throw new Error("Refresh failed");
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios.request(error.config);
        } catch (refreshError) {
          message = "Session expired, logging out...";
        }
      }
      message = "Session expired, logging out...";
    } else {
      switch (error.response.status) {
        case 403:
          message = "Access Forbidden";
          break;
        case 404:
          message = error.response.data.message ?? "Sorry! the data you are looking for could not be found";
          break;
        default: {
          message =
            error.response && error.response.data
              ? error.response.data["message"]
              : error.message || error;
        }
      }
      return Promise.reject(message);
    }
  }
);

const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY || "access-token";
const REFRESH_TOKEN_KEY = import.meta.env.VITE_REFRESH_TOKEN_KEY || "refresh-token";

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (tokens: { accessToken: string, refreshToken: string } | null) => {
  if (tokens) {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
    axios.defaults.headers.common["Authorization"] = "JWT " + tokens.accessToken
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    delete axios.defaults.headers.common["Authorization"];
  }
};

const getAccessTokenFromStorage = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) as string
};

class APICore {
  /**
   * Fetches data from given url
   */
  get = (url: string, params?: any) => {
    let response;
    if (params) {
      const queryString = params
        ? Object.keys(params)
          .map((key) => key + "=" + params[key])
          .join("&")
        : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }
    return response;
  };

  getFile = (url: string, params: any) => {
    let response;
    if (params) {
      const queryString = params
        ? Object.keys(params)
          .map((key) => key + "=" + params[key])
          .join("&")
        : "";
      response = axios.get(`${url}?${queryString}`, { responseType: "blob" });
    } else {
      response = axios.get(`${url}`, { responseType: "blob" });
    }
    return response;
  };

  getMultiple = (urls: string, params: any) => {
    const reqs = [];
    let queryString = "";
    if (params) {
      queryString = params
        ? Object.keys(params)
          .map((key) => key + "=" + params[key])
          .join("&")
        : "";
    }

    for (const url of urls) {
      reqs.push(axios.get(`${url}?${queryString}`));
    }
    return axios.all(reqs);
  };

  /**
   * post given data to url
   */
  create = (url: string, data?: any) => {
    return axios.post(url, data);
  };

  /**
   * Updates patch data
   */
  updatePatch = (url: string, data: any) => {
    return axios.patch(url, data);
  };

  /**
   * Updates data
   */
  update = (url: string, data: any) => {
    return axios.put(url, data);
  };

  /**
   * Deletes data
   */
  delete = (url: string) => {
    return axios.delete(url);
  };

  /**
   * post given data to url with file
   */
  createWithFile = (url: string, data: any) => {
    const formData = new FormData();
    for (const k in data) {
      formData.append(k, data[k]);
    }

    const config = {
      headers: {
        ...axios.defaults.headers,
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  };

  /**
   * post given data to url with file
   */
  updateWithFile = (url: string, data: any) => {
    const formData = new FormData();
    for (const k in data) {
      formData.append(k, data[k]);
    }

    const config = {
      headers: {
        ...axios.defaults.headers,
        "content-type": "multipart/form-data",
      },
    };
    return axios.patch(url, formData, config);
  };
}

/*
Check if token available in session
*/
const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
if (accessToken) {
  axios.defaults.headers.common["Authorization"] = "JWT " + accessToken
}

export { APICore, setAuthorization, getAccessTokenFromStorage };
