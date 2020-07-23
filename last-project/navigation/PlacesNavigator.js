import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import MapScreen from "../screens/MapScreen";
import PlacesDetailsScreen from "../screens/PlacesDetailsScreen";
import PlacesListScreen from "../screens/PlacesListScreen";
import { Platform } from "react-native";
import Colors from "../constants/Colors";

const mainStackNavigator = createStackNavigator(
  {
    Places: MapScreen,
    PlaceDetails: PlacesDetailsScreen,
    Map: MapScreen,
    AddPlace: PlacesListScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    },
  }
);

export default createAppContainer(mainStackNavigator);
