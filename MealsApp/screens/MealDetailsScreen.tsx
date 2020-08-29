import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
  NavigationStackOptions,
} from "react-navigation-stack";
import MealsNavigationParams from "../navigation/MealsNavigationParams";
import { NavigationScreenComponent } from "react-navigation";
import Meal from "../models/Meal";
import { MEALS } from "../dummy_data/dummy";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import MealsHeaderButton from "../components/MealsHeaderButton";
import colors from "../constants/colors";

interface MealDetailsScreenProps extends NavigationStackScreenProps {}

const styles = StyleSheet.create({
  listItemText: {
    paddingVertical: 5,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  itemDetails: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  screen: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    flex: 1,
  },
  textStyle: {
    fontFamily: "open-sans",
    color: colors.accentForeground,
  },
});

const MealDetailsScreen: NavigationStackScreenComponent<
  MealsNavigationParams,
  MealDetailsScreenProps
> = (props: MealDetailsScreenProps) => {
  const getText = (text: string | number) => {
    return <Text style={styles.textStyle}>{text}</Text>;
  };
  const meal = MEALS.find((m) => m.id === props.navigation.getParam("mealId"));
  if (meal === undefined) {
    return <Text>Not found</Text>;
  }
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View
        style={{
          width: "100%",
          height: "50%",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Image
          style={{
            height: "90%",
            width: "90%",
            padding: 10,
            margin: 10,
            borderRadius: 20,
          }}
          source={{ uri: meal.imageUrl }}
        />
      </View>

      <View style={styles.itemDetails}>
        {getText(meal.complexity.toUpperCase())}
        {getText(meal.duration)}
        {getText(meal.affordability)}
      </View>

      <View style={{ width: "100%", alignItems: "center" }}>
        <View style={{margin: 10}}>{getText("List of Ingredients")}</View>
        {meal.ingredients.map((ingredient) => {
          return <View style={styles.listItemText}>{getText(ingredient)}</View>;
        })}
      </View>
    </ScrollView>
  );
};

MealDetailsScreen.navigationOptions = (config) => {
  const mealId = config.navigation.getParam("mealId");
  let meal: Meal | undefined = MEALS.find((m) => m.id === mealId);
  const mealTitle = meal === undefined ? "unknown" : meal.title;
  const nav: NavigationStackOptions = {
    headerTitle: mealTitle,
    headerRight: (props) => (
      <HeaderButtons HeaderButtonComponent={MealsHeaderButton}>
        <Item title="Favorite" iconName="ios-star" onPress={() => {}} />
      </HeaderButtons>
    ),
  };
  return nav;
};
export default MealDetailsScreen;
