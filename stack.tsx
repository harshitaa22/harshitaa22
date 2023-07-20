import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { NAVIGATION } from "../navigation";
import HomeScreen from "../screens/Dashboard/TabStack/TabScreen/Home";
import GamblingScreen from "../screens/Dashboard/TabStack/TabScreen/Menu/GamblingPolicy";
import PolicyScreen from "../screens/Dashboard/TabStack/TabScreen/Menu/PrivacyPolicy";
import TermsConditionScreen from "../screens/Dashboard/TabStack/TabScreen/Menu/TermsAndConditions";
import NewsScreen from "../screens/Dashboard/TabStack/TabScreen/News";
import AllRacingScreen from "../screens/Dashboard/TabStack/TabScreen/Racing/AllRacing";
import RacingScreen from "../screens/Dashboard/TabStack/TabScreen/Racing";
import SingleRacingPage from "../screens/Dashboard/TabStack/TabScreen/Racing/SingleRacing";
import SportScreen from "../screens/Dashboard/TabStack/TabScreen/Sports";
import { ScreenOptions } from "../utils/constant";
import SportsMenu from "../screens/Dashboard/TabStack/TabScreen/Sports/SportsMenu";
import BlogScreen from "../screens/Dashboard/TabStack/TabScreen/Menu/Blog";
import BlogDetails from "../screens/Dashboard/TabStack/TabScreen/Menu/BlogDetails";
import FaqScreen from "../screens/Dashboard/TabStack/TabScreen/Menu/Faq";
import BookMarkerScreen from "../screens/Dashboard/TabStack/TabScreen/Menu/Bookmakers";
import QuickLinkScreen from "../screens/Dashboard/TabStack/TabScreen/Menu/QuickLinks";
import StatisticsMenu from "../screens/Dashboard/TabStack/TabScreen/Menu/StatisticsMenu";
import HelpScreen from "../screens/Dashboard/TabStack/TabScreen/Menu/Help";
import PoliciesScreen from "../screens/Dashboard/TabStack/TabScreen/Menu/Policies";
import MenuTab from "../screens/Dashboard/TabStack/TabScreen/Menu";
import NewsTab from "../screens/Dashboard/TabStack/TabScreen/News";
import NewsPageFootball from "../screens/Dashboard/TabStack/TabScreen/News/NewsPageFootball";
import SearchNews from "../screens/Dashboard/TabStack/TabScreen/News/SearchNews";
import FuturesRace from "../screens/Dashboard/TabStack/TabScreen/Racing/FuturesRace";

const StackHome = createNativeStackNavigator();
const StackRacing = createNativeStackNavigator();
const StackSport = createNativeStackNavigator();
const StackNews = createNativeStackNavigator();
const StackMenu = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <StackHome.Navigator>
      <StackHome.Screen
        name={NAVIGATION.HOMEPAGE}
        component={HomeScreen}
        options={ScreenOptions}
      />
      <StackRacing.Screen
        name={NAVIGATION.SINGLE_RACE_PAGE}
        component={SingleRacingPage}
        options={ScreenOptions}
      />
      <StackSport.Screen
        name={NAVIGATION.SPORT_PAGE}
        component={SportScreen}
        options={ScreenOptions}
      />
    </StackHome.Navigator>
  );
};

export const RacingStack = () => {
  return (
    <StackRacing.Navigator>
      <StackRacing.Screen
        name={NAVIGATION.SEE_ALL_PAGE} // see all
        component={AllRacingScreen}
        options={ScreenOptions}
      />
      <StackRacing.Screen
        name={NAVIGATION.SINGLE_RACE_PAGE}
        component={SingleRacingPage}
        options={ScreenOptions}
      />
      <StackRacing.Screen
        name={NAVIGATION.FUTURE_RACE}
        component={FuturesRace}
        options={ScreenOptions}
      />
    </StackRacing.Navigator>
  );
};

export const SportStack = () => {
  return (
    <StackSport.Navigator>
      <StackSport.Screen
        name={NAVIGATION.SPRTS_MENU}
        component={SportsMenu}
        options={ScreenOptions}
      />
      <StackSport.Screen
        name={NAVIGATION.SPORT_PAGE}
        component={SportScreen}
        options={ScreenOptions}
      />
    </StackSport.Navigator>
  );
};

export const NewsStack = () => {
  return (
    <StackNews.Navigator>
      <StackNews.Screen
        name={NAVIGATION.NEWS_TAB}
        component={NewsTab}
        options={ScreenOptions}
      />
      <StackNews.Screen
        name={NAVIGATION.FOOTBALL_NEWS}
        component={NewsPageFootball}
        options={ScreenOptions}
      />
      <StackNews.Screen
        name={NAVIGATION.SEARCH_NEWS}
        component={SearchNews}
        options={ScreenOptions}
      />
    </StackNews.Navigator>
  );
};

export const MenuStack = () => {
  return (
    <StackMenu.Navigator>
      <StackMenu.Screen
        name={NAVIGATION.MENU}
        component={MenuTab}
        options={ScreenOptions}
      />
      <StackMenu.Screen
        name={NAVIGATION.QUICK_LINKS}
        component={QuickLinkScreen}
        options={ScreenOptions}
      />
      <StackMenu.Screen
        name={NAVIGATION.STASTICS}
        component={StatisticsMenu}
        options={ScreenOptions}
      />
      <StackMenu.Screen
        name={NAVIGATION.HELP}
        component={HelpScreen}
        options={ScreenOptions}
      />
      <StackMenu.Screen
        name={NAVIGATION.POLICIES}
        component={PoliciesScreen}
        options={ScreenOptions}
      />
      <StackMenu.Screen
        name={NAVIGATION.PRIVACY_PAGE1}
        component={PolicyScreen}
        options={ScreenOptions}
      />
      <StackMenu.Screen
        name={NAVIGATION.PRIVACY_PAGE2}
        component={GamblingScreen}
        options={ScreenOptions}
      />
      <StackMenu.Screen
        name={NAVIGATION.PRIVACY_PAGE3}
        component={TermsConditionScreen}
        options={ScreenOptions}
      />
      <StackMenu.Screen
        name={NAVIGATION.BLOG}
        component={BlogScreen}
        options={ScreenOptions}
      />
      <StackMenu.Screen
        name={NAVIGATION.BLOG_DETAILS}
        component={BlogDetails}
        options={ScreenOptions}
      />
      <StackMenu.Screen
        name={NAVIGATION.FAQ}
        component={FaqScreen}
        options={ScreenOptions}
      />
      <StackMenu.Screen
        name={NAVIGATION.BOOK_MARKER_MENU}
        component={BookMarkerScreen}
        options={ScreenOptions}
      />
    </StackMenu.Navigator>
  );
};
