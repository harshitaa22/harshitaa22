import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import store from "./source/reducer";
import Route from "./source/route/index";
import {
  setDefaultLanguage,
  setTranslationGetters,
} from "./source/utils/Localize";

const App = () => {
  const [isLoadApp, setIsLoad] = useState(false);

  useEffect(() => {
    async function initialize() {
      initializeLanguage();
    }
    initialize();
  }, []);

  const initializeLanguage = () => {
    setTranslationGetters({
      en: () => require("./source/translations/en").en,
      de: () => require("./source/translations/de").de,
    });
    setDefaultLanguage(function (languageTag: any) {
      console.log("======set lang=======");
      setIsLoad(true);
    });
  };

  LogBox.ignoreAllLogs();
  console.log("========isLoadApp========" + isLoadApp);
  return (
    <>
      {isLoadApp && (
        <Provider store={store}>
          <Route />
        </Provider>
      )}
    </>
  );
};

export default App;
