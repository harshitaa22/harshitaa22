import axios from "react-native-axios";
import { NAVIGATION } from "../navigation";
import { DeviceEventEmitter } from "react-native";
axios.interceptors.response.use(
  (response) => {
    let status = checkForVersion(response);
    if (status) {
      // DeviceEventEmitter.emit(NAVIGATION.SHOW_UPDATE_DIALOG);
    } else {
      return response;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
export function checkForVersion(response) {
  if (response) {
    if (
      response?.headers?.map["SmartB-connect-version"] === "Upgrade-Required"
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
