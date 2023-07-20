import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../../theme/index";

export default StyleSheet.create({
  mainLoginView: {
    flex: 1,
  },
  svgIconStyle: {
    width: Metrics.rfv(160),
    height: Metrics.rfv(50),
    resizeMode: "contain",
  },
  signInText: {
    alignItems: "center",
  },
  signHeight: {
    height: Metrics.rfv(50),
  },
  height: {
    height: Metrics.rfv(70),
  },
  signInTextStyle: {
    color: Colors.white,
    fontSize: Metrics.rfv(21),
    fontFamily: Fonts.IN_SemiBold,
    lineHeight: Metrics.rfv(24),
  },
  fullWidthStyle: {
    width: "100%",
  },
  notHaveAccountTextStyle: {
    color: Colors.lightGrayBoxGray,
    fontSize: Metrics.rfv(12),
    lineHeight: Metrics.rfv(14),
    fontFamily: Fonts.IN_Regular,
  },
  rowContainerView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Metrics.rfv(8),
    marginBottom: Metrics.rfv(15),
  },
  signUpTextStyle: {
    color: Colors.white,
    marginLeft: Metrics.rfv(8),
    fontSize: Metrics.rfv(12),
    fontFamily: Fonts.IN_Bold,
    textDecorationLine: "underline",
    textDecorationColor: Colors.white,
  },
  passwordTextStyle: {
    color: Colors.white,
    fontSize: Metrics.rfv(12),
    fontFamily: Fonts.IN_SemiBold,
    alignSelf: "flex-start",
    marginTop: Metrics.rfv(15),
    marginBottom: Metrics.rfv(5),
  },
  forgotPasswordTextStyle: {
    color: Colors.white,
    fontSize: Metrics.rfv(12),
    fontFamily: Fonts.IN_Regular,
    textDecorationLine: "underline",
    textDecorationColor: Colors.white,
    marginTop: Metrics.rfv(12),
    marginHorizontal: Metrics.rfv(20),
  },
  safeAreaViewStyle: {
    flex: 0,
    backgroundColor: Colors.linearColor1,
  },
  horizontalContainerView: {
    marginHorizontal: Metrics.rfv(20),
    alignItems: "center",
  },
  screenMainContainerStyle: {
    flex: 1,
    width: "100%",
  },
  horizontalView: {
    width: "100%",
    paddingHorizontal: Metrics.rfv(20),
  },
  userValidEmailText: {
    color: Colors.red,
    fontFamily: Fonts.IN_Regular,
    fontSize: Metrics.rfv(12),
    lineHeight: Metrics.rfv(14),
    // textAlign: "center",
    marginHorizontal: Metrics.rfv(20),
    marginTop: Metrics.rfv(10),
  },
  backArrowStyle: {
    width: Metrics.rfv(16),
    height: Metrics.rfv(16),
  },
  arrowContainerStyle: {
    width: Metrics.rfv(50),
    paddingVertical: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(15),
  },
  fullFlexStyle: {
    flex: 1,
  },
});
