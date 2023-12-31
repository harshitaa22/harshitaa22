import { API_URL } from "../../env.json";
let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
export default API_CONFIG = {
  BASE_URL: API_URL,
  POST: "1",

  GET: "2",
  DELETE: "3",
  IMAGE_UPLOAD: "4",
  GET_WITH_DATA: "5",
  PUT: "6",
  PLACE_API: "7",
  DELETE_WITH_DATA: "8",
  AUTHORIZE_DATA: "9",
  FORGOT_DATA: "10",

  SIGNUP: "user/register",
  // VERIFY_OTP: "User/verifyRegisterUserWithOtp",
  LOGIN: "user/login",
  GET_BOOK_KEEPER_PROVIDERS: `public/apiProviders/bookkeeperproviders`,
  GET_HORSES_RACING: `/events/sportData/?limit=4&isRaceSeeAll=${1}&sportId=${"1,2,3"}&countryId=${""}&stateId=${""}&timezone=${timezone}`,
  RESET_PASSWORD: `user/resetPassword/`,
  FORGOT_PASSWORD: "user/forgotPassword/",
  VERIFY_OTP: "user/verifyOtp/",
  ADDCLICK: "addClick",
  RESEND_OTP: "user/resendOtp",
  COUNTRY: "public/country?limit=20&offset=",
  STATE: "public/state/country",
  GET_NEWS: "news/getNews",
  RUNEER: "events/runner/",
  POFILE: "user/profile",
  EDIT_PROFILE: "user/editProfile",
  ADDS: "getAllAds?page_id=",
  ADDIMPRESSION: "addImpression",
  GETSTATE: "public/state/country/13?limit=20&offset=",
  HUBSPORT: "public/advertiseHubSpot ",
  GEOLOCATION: "public/check",
  SPONSORED: "public/sponsor?",
  GET_ALL_CATEGORIES: "v2/news/category",
  GET_OUR_PARTNERS: `apiProviders/bookKeepers?isPartner=true`,
  GET_SINGLENEWS_ID: "v2/news/articles/",
  GET_ARTICALES_ID: "v2/news/topstory/articles",
  GET_FEATURE_ARTICALES: "v2/news/feature/articles",
  GET_ALL_NEWS: "v2/news/",
  HOME_ARTICALES: "v2/news/homepage/articles",
  COUNTER_CLICK: `public/providerClick`,
};
