import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LocationScreen from "./src/screens/LocationScreen";
import SignInScreen from "./src/screens/SignInScreen";
import ItineraryScreen from "./src/screens/ItineraryScreen";
import ItineraryDetailScreen from "./src/screens/ItineraryDetailScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import PreferenceScreen from "./src/screens/PreferencesScreen";
import FiltersScreen from "./src/screens/FiltersScreen";

const switchNavigator = createSwitchNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  location: LocationScreen,
  preference: PreferenceScreen,
  filter: FiltersScreen,
  itinerary: ItineraryScreen,
  itineraryDetail: ItineraryDetailScreen
});

const App = createAppContainer(switchNavigator);

export default () => {
  return <App />;
};
