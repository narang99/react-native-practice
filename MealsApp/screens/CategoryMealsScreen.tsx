import React from "react";
import { StyleSheet, View } from "react-native";
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
  NavigationStackOptions,
} from "react-navigation-stack";
import Category from "../models/Category";
import MealsNavigationParams from "../navigation/MealsNavigationParams";
import { CATEGORIES } from "../dummy_data/dummy";
import Meal from "../models/Meal";
import MealList from "../components/MealList";

interface CategoryMealsScreenProps extends NavigationStackScreenProps {}

const styles = StyleSheet.create({
  listStyle: {
    flexGrow: 1,
    alignContent: "center",
    paddingBottom: 30,
  },
  screen: {
    justifyContent: "center",
    flex: 1,
  },
});

const CategoryMealsScreen: NavigationStackScreenComponent<
  MealsNavigationParams,
  CategoryMealsScreenProps
> = (props: CategoryMealsScreenProps) => {
  const catId: string = props.navigation.getParam("categoryId");

  const goToMealDetailsScreen = (meal:Meal, index:number) => {
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
        filterMeals={(meal, index) => meal.categoryIds.includes(catId)}
      />
    </View>
  );
};

CategoryMealsScreen.navigationOptions = (config) => {
  let category: Category | undefined = CATEGORIES.find(
    (item) => item.id === config.navigation.getParam("categoryId")
  );
  if (category === undefined) {
    category = new Category("-1", "undefined", "#00000");
  }
  const nav: NavigationStackOptions = {
    headerTitle: category.title,
  };
  return nav;
};
export default CategoryMealsScreen;
