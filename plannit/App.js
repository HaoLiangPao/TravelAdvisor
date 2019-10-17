import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import LocationScreen from "./src/screens/LocationScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import { Provider as AuthProvider } from "./src/context/authContext";

const switchNavigator = createSwitchNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  mainFlow: createSwitchNavigator({
    location: LocationScreen,
    filter: filterScreen
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return <App />;
};
