import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PlaceListScreen from "../screens/PlaceListScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import MapScreen from "../screens/MapScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import COLORS from "../constants/colors";
import { Platform } from "react-native";
import { PlaceStackParamList } from "../types";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { Item, HeaderButtons } from "react-navigation-header-buttons";

const PlacesStackNavigator = createStackNavigator<PlaceStackParamList>();

const PlacesNavigator: React.FC<{}> = (props) => {
  return (
    <NavigationContainer>
      <PlacesStackNavigator.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor:
              Platform.OS === "android" ? COLORS.primary : "white",
          },
          headerTintColor: Platform.OS === "android" ? "white" : COLORS.primary,
          headerTitleAlign: "center",
        }}
      >
        <PlacesStackNavigator.Screen
          name="Places"
          component={PlaceListScreen}
          options={({ navigation }) => {
            return {
              title: "Places",
              headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                  <Item
                    title="Add Item"
                    iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
                    onPress={() => navigation.navigate("NewPlace")}
                  />
                </HeaderButtons>
              ),
            };
          }}
        />
        <PlacesStackNavigator.Screen
          name="PlaceDetail"
          component={PlaceDetailScreen}
          initialParams={{ title: "" }}
          options={({ route }) => {
            return {
              title: route.params.title,
            };
          }}
        />
        <PlacesStackNavigator.Screen name="Map" component={MapScreen} />
        <PlacesStackNavigator.Screen
          name="NewPlace"
          component={NewPlaceScreen}
        />
      </PlacesStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default PlacesNavigator;
