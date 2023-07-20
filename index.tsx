import API_CONFIG from "./api_url";
import { print_data } from "../utils/Logs";
import axios from "react-native-axios";
import VersionCheck from "react-native-version-check";

export const callApi = (path: any, body: any, method: any, token: any) => {
  let current_app_verison = VersionCheck.getCurrentVersion();

  const headers = {
    "Content-Type": "application/json",
    "accept-language": "en",
  };

  if (token != null) {
    headers["Authorization"] = token;
  }
  headers["SmartB-connect-version"] = current_app_verison;

  const url = [API_CONFIG.BASE_URL, path].join("/");
  if (method == API_CONFIG.GET) {
    return axios
      .get(url, { headers })
      .then((response: any) => {
        return { body: response };
      })
      .catch((error: any) => {
        const errorJson = error.response;
        return { body: errorJson };
      });
  }
  if (method == API_CONFIG.GET_WITH_DATA) {
    return axios
      .get(url, body, { headers })
      .then((response: any) => {
        return { body: response };
      })
      .catch((error: any) => {
        const errorJson = error.response;
        return { body: errorJson };
      });
  } else if (method == API_CONFIG.FORGOT_DATA) {
    return axios
      .get(url, body, {
        "Content-Type": "application/json",
        "accept-language": "en",
        auth: body,
      })
      .then((response: any) => {
        return { body: response };
      })
      .catch((error: any) => {
        const errorJson = error.response;
        return { body: errorJson };
      });
  } else if (method == API_CONFIG.POST) {
    return axios
      .post(url, body, { headers })
      .then((response: any) => {
        return { body: response };
      })
      .catch((error: any) => {
        const errorJson = error.response;
        return { body: errorJson };
      });
  } else if (method == API_CONFIG.AUTHORIZE_DATA) {
    return axios
      .post(url, body, {
        "Content-Type": "application/json",
        "accept-language": "en",
        auth: body,
      })
      .then((response: any) => {
        return { body: response };
      })
      .catch((error: any) => {
        const errorJson = error.response;
        return { body: errorJson };
      });
  } else if (method == API_CONFIG.PUT) {
    return axios
      .put(url, body, { headers })
      .then((response: any) => {
        return { body: response };
      })
      .catch((error: any) => {
        const errorJson = error.response;
        return { body: errorJson };
      });
  } else if (method == API_CONFIG.DELETE) {
    return axios
      .delete(url, { headers })
      .then((response: any) => {
        return { body: response };
      })
      .catch((error: any) => {
        const errorJson = error.response;
        return { body: errorJson };
      });
  } else if (method == API_CONFIG.DELETE_WITH_DATA) {
    print_data(body);
    return axios
      .delete(url, { data: body, headers: headers })
      .then((response: any) => {
        return { body: response };
      })
      .catch((error: any) => {
        const errorJson = error.response;
        return { body: errorJson };
      });
  } else if (method == API_CONFIG.IMAGE_UPLOAD) {
    try {
      const headers = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: token,
      };
      return axios
        .post(url, body, { headers }, { timeout: 60 * 10 * 1000 })
        .then((response: any) => {
          return { body: response };
        })
        .catch((error: any) => {
          const errorJson = error.response;
          return { body: errorJson };
        });
    } catch (e) {
      print_data(e?.response);
    }
  } else if (method == API_CONFIG.PLACE_API) {
    return axios
      .get(path)
      .then((response: any) => {
        return { body: response };
      })
      .catch((error: any) => {
        const errorJson = error.response;
        return { body: errorJson };
      });
  } else if (method == API_CONFIG.PLACE_API) {
    return axios
      .get(path)
      .then((response: any) => {
        return { body: response };
      })
      .catch((error: any) => {
        const errorJson = error.response;
        return { body: errorJson };
      });
  }
};
