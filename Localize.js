import AsyncStorage from "@react-native-async-storage/async-storage";
import memoize from "lodash.memoize";
import i18n from "i18n-js";
import * as RNLocalize from "react-native-localize";

var translationGetters = null;

export const setTranslationGetters = (value) => {
  translationGetters = value;
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

export const setDefaultLanguage = (completion) => {
  // Check for saved language
  AsyncStorage.getItem("@selectedLang", function (error, result) {
    if (result !== null) {
      const { languageTag } = {
        languageTag: result,
      };
      setI18nConfig(languageTag);
      completion(languageTag);
    } else {
      const fallback = { languageTag: "en" };
      const { languageTag } =
        RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
        fallback;
      setI18nConfig(languageTag);
      completion(null);
    }
  });
};

export const setLanguage = (languageTag, completion) => {
  setI18nConfig(languageTag);
  AsyncStorage.setItem("@selectedLang", languageTag, function (error) {
    completion(languageTag);
  });
};

export const setI18nConfig = (languageTag) => {
  translate.cache.clear();
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};

module.exports = {
  setTranslationGetters,
  setDefaultLanguage,
  setLanguage,
  translate,
};
