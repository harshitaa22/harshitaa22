import Toast from "react-native-simple-toast";
import NetInfo from "@react-native-community/netinfo";
import { getStatusBarHeight } from "react-native-status-bar-height";

export function validateEmail(email: string) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}

export async function clearAsyncData(_props?: any) {
  try {
  } catch (e) {}
}

export async function showToast(text: string) {
  Toast.show(text, Toast.SHORT);
}

export async function isConnectionAvailable() {
  const response = await NetInfo.fetch();
  return response.isConnected;
}

export function claculateStausBarHeight() {
  return getStatusBarHeight();
}
