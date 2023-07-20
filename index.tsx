import React, { createRef, useState } from "react";
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
import { NAVIGATION } from "../../../navigation";
import { Colors, CommonStyle, Images, Metrics } from "../../../theme/index";
import { BackArrow, SmartBAppIcon } from "../../../theme/svg";
import commonStyles from "../../../theme/commonStyle";
import styles from "./style";
import { CommonActions, useNavigation } from "@react-navigation/native";
import CustomTextInput from "../../../component/TextInput/index";
import {
  isConnectionAvailable,
  showToast,
} from "../../../utils/commonFunction";
import { APP_CONSTANT } from "../../../utils/appConstant";
import ErrorText from "../../../component/ErrorText";
import KeyboardSpacer from "react-native-keyboard-spacer";
import Loader from "../../../component/ProgressBar";
import { translate } from "../../../utils/Localize";
import { print_data } from "../../../utils/Logs";
import API_CONFIG from "../../../api/api_url";
import { Constant } from "../../../utils";
import { callApi } from "../../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userEmailRef = createRef();
  const usePasswordRef = createRef();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isShowEmailError, showEmailError] = useState(false);
  const [isShowPassError, showPassError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState("");
  const [isLoadervisible, setIsLoaderVisible] = useState(false);
  const [passErrorText, setPassErrorText] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [validEmail, setValidEmail] = useState("");

  const clearFieldsAndNavigate = async () => {
    clearData();
    setIsLoaderVisible(false),
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: NAVIGATION.TAB_STACK }],
        })
      );
  };

  const onLoginPress = async () => {
    Keyboard.dismiss();
    let is_validate = true;
    if (await isConnectionAvailable()) {
      if (userEmail?.length == 0) {
        is_validate = false;
        showEmailError(true);
        setEmailErrorText(translate("EmptyError"));
      } else if (!APP_CONSTANT.EMAIL_PATTERN.test(userEmail)) {
        is_validate = false;
        showEmailError(true);
        setEmailErrorText(translate("EmailNotValidError"));
      }
      if (userPassword?.length == 0) {
        is_validate = false;
        showPassError(true);
        setPassErrorText(translate("EmptyError"));
      } else if (userPassword?.length < 6) {
        is_validate = false;
        showPassError(true);
        setPassErrorText(translate("PasswordNotValidError"));
      }
      if (is_validate) {
        setIsLoaderVisible(true);
        callLoginAPi();
      }
    } else {
      showToast(translate("InternetConnection"));
    }
  };

  const callLoginAPi = async () => {
    var param_data = {
      username: userEmail,
      password: userPassword,
    };
    try {
      const response = await callApi(
        API_CONFIG.LOGIN,
        param_data,
        API_CONFIG.AUTHORIZE_DATA,
        null
      );
      print_data(response);
      if (response.body != null) {
        if (response.body?.status === 200) {
          setIsLoaderVisible(false);
          if (response?.body?.data?.isVerified === true) {
            if (response?.body?.data?.status == false) {
              setErrorMsg(true);
              setValidEmail(response?.body?.data?.message);
            } else {
              redirectToHome(response?.body?.data);
            }
          } else {
            verifyAcc();
          }
        } else {
          setIsLoaderVisible(false);
          if (response?.body?.data?.status === false) {
            setErrorMsg(true);
            setValidEmail(response?.body?.data?.message);
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
      print_data("=====exception=====" + error);
    }
  };

  const verifyAcc = () => {
    navigation.navigate(NAVIGATION.REGISTER_OTP, {
      fromewhere: 1,
      userEmailData: userEmail,
    });
  };

  const onForgotPress = () => {
    clearData();
    navigation.navigate(NAVIGATION.FORGOT);
  };

  const onSignupPress = () => {
    clearData();
    navigation.navigate(NAVIGATION.REGISTER);
  };

  const clearData = () => {
    showEmailError(false),
      setEmailErrorText(""),
      setUserPassword(""),
      showPassError(false),
      setPassErrorText(""),
      setUserEmail("");
    setValidEmail("");
  };

  const saveUserData = async (response) => {
    try {
      const customData = {
        token: response?.access_token,
      };
      dispatch({
        type: Constant.SAVE_TOKEN,
        payload: JSON.stringify(customData),
      });
      await AsyncStorage.setItem(
        Constant.SAVE_TOKEN,
        JSON.stringify(customData)
      );
    } catch (e) {
      print_data("========exception in login data save=========" + e);
    }
  };

  const redirectToHome = (response) => {
    saveUserData(response);
    setTimeout(() => {
      clearFieldsAndNavigate();
    }, 50);
  };

  return (
    <AppSafeAreaView
      firstSafeAreaViewStyle={styles.safeAreaViewStyle}
      backgroundColor={Colors.linearColor2}
    >
      <AppStatusBar
        backgroundColor={Colors.linearColor1}
        barStyle={"light-content"}
      />
      <LinearGradient
        colors={[Colors.linearColor1, Colors.linearColor2]}
        style={styles.mainLoginView}
      >
        <Pressable
          style={styles.arrowContainerStyle}
          onPress={() => navigation.goBack()}
        >
          <BackArrow style={styles.backArrowStyle} color={Colors.white} />
        </Pressable>
        <ScrollView
          contentContainerStyle={commonStyles.scrollViewStyle}
          overScrollMode={"never"}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={"handled"}
        >
          <View style={styles.screenMainContainerStyle}>
            <View style={styles.height} />
            <View style={styles.horizontalContainerView}>
              {/* <SmartBAppIcon style={styles.svgIconStyle} /> */}
              <Image source={Images.loginLogo} style={styles.svgIconStyle} />
              <View style={styles.signHeight} />
              <Text style={styles.signInTextStyle}>{translate("SignIn")}</Text>
              <View style={styles.rowContainerView}>
                <Text style={styles.notHaveAccountTextStyle}>
                  {translate("NotHaveAccount")}
                </Text>
                <Pressable onPress={() => onSignupPress()}>
                  <Text style={styles.signUpTextStyle}>
                    {translate("SignUp")}
                  </Text>
                </Pressable>
              </View>
              <CustomTextInput
                ref={userEmailRef}
                textInputStyle={commonStyles.textInputStyle}
                placeholderText={translate("Email")}
                placeholderTextColor={Colors.white}
                containerStyle={commonStyles.inputTextContainerStyle}
                lableText={translate("Email")}
                lableTextStyle={commonStyles.labelTextStyle}
                inputTextStyle={commonStyles.inputTextStyle}
                value={userEmail}
                returnKeyType={"next"}
                keyboardType={"email-address"}
                onChangeText={(text: string) => {
                  setUserEmail(text);
                  showEmailError(false);
                }}
                onSubmitEditing={() => {
                  if (usePasswordRef) {
                    usePasswordRef?.current?.focus();
                  }
                }}
              />
              <View style={styles.fullWidthStyle}>
                <ErrorText
                  errorText={emailErrorText}
                  is_visible={isShowEmailError}
                />
              </View>
              <CustomTextInput
                ref={usePasswordRef}
                textInputStyle={commonStyles.textInputStyle}
                placeholderTextColor={Colors.white}
                isPasswordField={true}
                secureTextEntry={true}
                containerStyle={commonStyles.inputTextContainerStyle}
                lableText={translate("Password")}
                lableTextStyle={commonStyles.labelTextStyle}
                inputTextStyle={commonStyles.inputTextStyle}
                value={userPassword}
                returnKeyType={"done"}
                onChangeText={(text: string) => {
                  setUserPassword(text);
                  showPassError(false);
                }}
                onSubmitEditing={() => onLoginPress()}
              />
              <View style={styles.fullWidthStyle}>
                <ErrorText
                  errorText={passErrorText}
                  is_visible={isShowPassError}
                />
              </View>
            </View>
            {errorMsg ? (
              <Text style={styles.userValidEmailText}>{validEmail}</Text>
            ) : null}
            <Pressable onPress={onForgotPress}>
              <Text style={styles.forgotPasswordTextStyle}>
                {translate("ForgotPassword")}
              </Text>
            </Pressable>
            <View style={styles.horizontalView}>
              <Button
                disabled={false}
                onPress={() => onLoginPress()}
                title={translate("SignIn")}
                color={Colors.linearColor1}
                fontSize={Metrics.rfv(14)}
                backgroundColor={Colors.white}
              />
            </View>
          </View>
          {Platform.OS == "ios" ? (
            <KeyboardSpacer />
          ) : (
            <View style={CommonStyle.bottomContainer} />
          )}
        </ScrollView>
      </LinearGradient>
      {isLoadervisible && (
        <View style={commonStyles.loader}>
          <Loader color={Colors.white} />
        </View>
      )}
    </AppSafeAreaView>
  );
}
