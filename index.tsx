import React, { useRef, useState } from "react";
import {
  Image,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AppSafeAreaView from "../../../component/AppSafeAreaView";
import AppStatusBar from "../../../component/AppStatusBar";
import Button from "../../../component/Button/index";
import { Colors, CommonStyle, Images, Metrics } from "../../../theme/index";
import { SmartBAppSmallIcon } from "../../../theme/svg";
import commonStyles from "../../../theme/commonStyle";
import styles from "./style";
import CustomTextInput from "../../../component/TextInput/index";
import ErrorText from "../../../component/ErrorText";
import {
  isConnectionAvailable,
  showToast,
} from "../../../utils/commonFunction";
import Loader from "../../../component/ProgressBar";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { NAVIGATION } from "../../../navigation";
import { useNavigation } from "@react-navigation/native";
import { translate } from "../../../utils/Localize";
import API_CONFIG from "../../../api/api_url";
import { callApi } from "../../../api";

export default function RegisterOtpScreen(props: any) {
  const navigation = useNavigation();
  const [isLoadervisible, setIsLoaderVisible] = useState(false);
  const [otpVerify, setOtpVerify] = useState("");
  const [isShowOtpError, showOtpError] = useState(false);
  const [otpErrorText, setOtpErrorText] = useState("");
  const [verifyOtpError, setVerifyOtpError] = useState(false);
  const [verifyOtpErrorText, setverifyOtpErrorText] = useState("");
  const [resendOtpVisible, setResendOtpVisible] = useState(false);

  const { registerData, fromewhere, userEmailData } = props.route.params;

  const onSubmitPress = async () => {
    Keyboard.dismiss();
    let is_validate = true;
    if (await isConnectionAvailable()) {
      if (otpVerify?.length == 0) {
        is_validate = false;
        showOtpError(true);
        setOtpErrorText(translate("PleaseEnterOtp"));
        setOtpVerify("");
      }
      if (is_validate) {
        setIsLoaderVisible(true);
        if (fromewhere === 1) {
          callLoginVerifyOtp();
        } else {
          callVerifyOtp();
        }
      }
    } else {
      showToast(translate("InternetConnection"));
    }
  };

  const onResendePresss = () => {
    clearData();

    if (fromewhere === 1) {
      callLoginResendOtp();
    } else {
      callResendOtp();
    }
  };

  const redirectToHome = (response) => {
    navigation.navigate(NAVIGATION.NEXT6SIGN_UP, {
      responsData: response,
    });
  };

  const clearData = () => {
    setOtpVerify("");
    showOtpError(false);
    setOtpErrorText("");
    setVerifyOtpError(false);
    setverifyOtpErrorText("");
  };

  const callResendOtp = async () => {
    try {
      const response = await callApi(
        API_CONFIG.RESEND_OTP + "/" + registerData?.userEmail,
        null,
        API_CONFIG.GET,
        null
      );
      if (response.body != null) {
        if (response.body?.status === 200) {
          setIsLoaderVisible(false);
          setVerifyOtpError(false);
          setResendOtpVisible(true);
          setTimeout(() => {
            setResendOtpVisible(false);
          }, 2000);
        } else {
          setIsLoaderVisible(false);
          setTimeout(() => {
            if (response?.body?.data?.message) {
              showToast(response?.body?.data?.message);
            } else {
              showToast(translate("SomethingWrong"));
            }
          }, 10);
        }
      } else {
        setIsLoaderVisible(false);
        setTimeout(() => {
          showToast(translate("SomethingWrong"));
        }, 10);
      }
    } catch (error) {
      setIsLoaderVisible(false);
      setTimeout(() => {
        showToast(translate("SomethingWrong"));
      }, 10);
    }
  };

  const callLoginResendOtp = async () => {
    try {
      const response = await callApi(
        API_CONFIG.RESEND_OTP + "/" + userEmailData,
        null,
        API_CONFIG.GET,
        null
      );

      if (response.body != null) {
        if (response.body?.status === 200) {
          setIsLoaderVisible(false);
          setResendOtpVisible(true);
          setTimeout(() => {
            setResendOtpVisible(false);
          }, 5000);
          setVerifyOtpError(false);
        } else {
          setIsLoaderVisible(false);
          setTimeout(() => {
            if (response?.body?.data?.message) {
              showToast(response?.body?.data?.message);
            } else {
              showToast(translate("SomethingWrong"));
            }
          }, 10);
        }
      } else {
        setIsLoaderVisible(false);
        setTimeout(() => {
          showToast(translate("SomethingWrong"));
        }, 10);
      }
    } catch (error) {
      setIsLoaderVisible(false);
      setTimeout(() => {
        showToast(translate("SomethingWrong"));
      }, 10);
    }
  };

  const callVerifyOtp = async () => {
    try {
      const response = await callApi(
        API_CONFIG.VERIFY_OTP + registerData?.userEmail + "/" + otpVerify,
        null,
        API_CONFIG.GET,
        null
      );
      if (response.body != null) {
        if (response.body?.status === 200) {
          setIsLoaderVisible(false);
          redirectToHome(response?.body?.data);
        } else {
          setIsLoaderVisible(false);
          if (response?.body?.data?.status === false) {
            setVerifyOtpError(true);
            setverifyOtpErrorText(translate("InvalidOtp"));
          } else {
            setTimeout(() => {
              showToast(translate("SomethingWrong"));
            }, 10);
          }
        }
      } else {
        setIsLoaderVisible(false);
        setTimeout(() => {
          showToast(translate("SomethingWrong"));
        }, 10);
      }
    } catch (error) {
      setIsLoaderVisible(false);
      setTimeout(() => {
        showToast(translate("SomethingWrong"));
      }, 10);
    }
  };

  const callLoginVerifyOtp = async () => {
    try {
      const response = await callApi(
        API_CONFIG.VERIFY_OTP + userEmailData + "/" + otpVerify,
        null,
        API_CONFIG.GET,
        null
      );
      if (response.body != null) {
        if (response.body?.status === 200) {
          setIsLoaderVisible(false);
          redirectToHome(response?.body?.data);
        } else {
          setIsLoaderVisible(false);
          if (response?.body?.data?.status === false) {
            setVerifyOtpError(true);
            setverifyOtpErrorText(translate("InvalidOtp"));
          } else {
            setTimeout(() => {
              showToast(translate("SomethingWrong"));
            }, 10);
          }
        }
      } else {
        setIsLoaderVisible(false);
        setTimeout(() => {
          showToast(translate("SomethingWrong"));
        }, 10);
      }
    } catch (error) {
      setIsLoaderVisible(false);
      setTimeout(() => {
        showToast(translate("SomethingWrong"));
      }, 10);
    }
  };

  return (
    <AppSafeAreaView
      firstSafeAreaViewStyle={styles.safeAreaViewStyle}
      backgroundColor={Colors.linearColor2}
    >
      <AppStatusBar
        backgroundColor={Colors.linearColor1}
        isTransperent={false}
        barStyle={"light-content"}
      />
      <LinearGradient
        colors={[Colors.linearColor1, Colors.linearColor2]}
        style={styles.mainLoginView}
      >
        <ScrollView
          contentContainerStyle={commonStyles.scrollViewStyle}
          overScrollMode={"never"}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={"handled"}
        >
          <View style={styles.horizontalContainerView}>
            {/* <SmartBAppSmallIcon style={styles.svgIconStyle} /> */}
            <Image source={Images.registerLogo} style={styles.svgIconStyle} />
            <View style={styles.height} />
            <Text style={styles.signInTextStyle}>{translate("VerifyOtp")}</Text>
          </View>
          <View style={styles.inputTextStyle}>
            <Text style={styles.sentOtpText}>
              {translate("SentOtpText")}
              <Text style={styles.userEmailText}>
                {registerData?.userEmail}
              </Text>
              {translate("CheckOtpText")}
            </Text>
            <CustomTextInput
              textInputStyle={commonStyles.textInputStyle}
              placeholderTextColor={Colors.white}
              containerStyle={commonStyles.inputTextContainerStyle}
              lableTextStyle={commonStyles.labelTextStyle}
              inputTextStyle={commonStyles.inputTextStyle}
              lableText={translate("OneTimePassword")}
              value={otpVerify}
              maxLength={6}
              keyboardType={"numeric"}
              onChangeText={(text: string) => {
                setOtpVerify(text);
                showOtpError(false);
              }}
              onSubmitEditing={() => onSubmitPress()}
            />
            <View style={styles.fullWidthStyle}>
              <ErrorText errorText={otpErrorText} is_visible={isShowOtpError} />
            </View>
            {verifyOtpError ? (
              <Text style={styles.errorTextStyle}>{verifyOtpErrorText}</Text>
            ) : null}
            <Pressable onPress={() => onResendePresss()}>
              <Text style={styles.resendOtpText}>{translate("ResendOtp")}</Text>
            </Pressable>
            <Button
              disabled={false}
              onPress={() => onSubmitPress()}
              title={translate("Continue")}
              color={Colors.black}
              fontSize={Metrics.rfv(14)}
              backgroundColor={Colors.white}
            />
          </View>
          {resendOtpVisible && (
            <View style={styles.endView}>
              <View style={styles.sucessViewStyle}>
                <Image
                  style={styles.sucessIcon}
                  source={Images.profileSucessIcon}
                />
                <Text style={styles.sucessText}>
                  {translate("ResendOtpText")}
                </Text>
              </View>
            </View>
          )}
          {Platform.OS == "ios" ? (
            <KeyboardSpacer />
          ) : (
            <View style={CommonStyle.bottomContainer} />
          )}
        </ScrollView>
      </LinearGradient>
      {isLoadervisible && (
        <View style={commonStyles.loader}>
          <Loader />
        </View>
      )}
    </AppSafeAreaView>
  );
}
