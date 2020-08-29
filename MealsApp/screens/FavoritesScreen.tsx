import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
  NavigationStackOptions,
} from "react-navigation-stack";
import MealsNavigationParams from "../navigation/MealsNavigationParams";
import MealList from "../components/MealList";
import Meal from "../models/Meal";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import MealsHeaderButton from '../components/MealsHeaderButton';

interface FavoritesScreenProps extends NavigationStackScreenProps {}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

const FavoritesScreen: NavigationStackScreenComponent<
  MealsNavigationParams,
  FavoritesScreenProps
> = (props) => {
  const goToMealDetailsScreen = (meal: Meal, index: number) => {
    props.navigation.navigate({
      routeName: "MealDetails",
      params: {
        mealId: meal.id,
      },
    });
  };
  return (
    <View style={styles.screen}>
      <MealList
        onPress={goToMealDetailsScreen}
        filterMeals={(item, index) => item.id === "m1"}
      />
    </View>
  );
};

FavoritesScreen.navigationOptions = (config) => {
  const nav: NavigationStackOptions = {
    headerTitle: "Favorites",
    headerLeft: (props) => (
      <HeaderButtons HeaderButtonComponent={MealsHeaderButton}>
        <Item title="menu" iconName="ios-menu" />
      </HeaderButtons>
    ),
  };
  return nav;
};

export default FavoritesScreen;
