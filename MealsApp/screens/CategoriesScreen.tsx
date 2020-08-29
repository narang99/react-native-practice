import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, Button } from "react-native";
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
} from "react-navigation-stack";
import { FlatList } from "react-native-gesture-handler";
import { CATEGORIES } from "../dummy_data/dummy";
import Category from "../models/Category";
import CategoryListItemTile from "../components/CategoryListItemTile";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import MealsHeaderButton from "../components/MealsHeaderButton";

interface CategoriesScreenProps extends NavigationStackScreenProps{}

const styles = StyleSheet.create({
  flatListStyle: {
    alignItems: "center",
    flexGrow: 1,
  },
  screen: {
    flex: 1,
  },
});

const CategoriesScreen: NavigationStackScreenComponent<NavigationStackScreenProps> = (
  props: CategoriesScreenProps
) => {
  const onGoToMealsPress = () => {
    props.navigation.navigate({ routeName: "CategoryMeals" });
  };

  const onItemPress = (item: Category, index: number) => {
    props.navigation.navigate({
      routeName: "CategoryMeals",
      params: {
        categoryId: item.id,
      },
    });
  };

  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={CATEGORIES}
        contentContainerStyle={styles.flatListStyle}
        nestedScrollEnabled
        renderItem={(item) => {
          return (
            <CategoryListItemTile
              item={item.item}
              index={item.index}
              onPress={onItemPress}
            />
          );
        }}
        numColumns={2}
      />
    </View>
  );
};

CategoriesScreen.navigationOptions = (config) => {
  return {
    headerTitle: "Meal Categories",
    headerLeft: (props) => (
      <HeaderButtons HeaderButtonComponent={MealsHeaderButton}>
        <Item title="menu" iconName="ios-menu" onPress={() => {
          /* this is problem of typing. but the method will exist. Should have used normal react for this. Won't use typescript now */
          config.navigation.toggleDrawer();
        }} />
      </HeaderButtons>
    ),
  };
};

export default CategoriesScreen;
