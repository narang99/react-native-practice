import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
} from "react-navigation-stack";
import MealsNavigationParams from "../navigation/MealsNavigationParams";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import MealsHeaderButton from "../components/MealsHeaderButton";
import { Switch } from "react-native-gesture-handler";
import colors from "../constants/colors";

interface FilteresScreenProps extends NavigationStackScreenProps {}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  switchContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  textStyle: {
    fontFamily: "open-sans",
    fontSize: 18,
  },
});

const SwitchAndText: React.FC<{
  text: string;
  onToggle: () => void;
  value: boolean;
}> = (props) => {
  return (
    <View style={styles.switchContainer}>
      <Text style={styles.textStyle}>{props.text}</Text>
      <Switch value={props.value} onValueChange={props.onToggle} trackColor={{true: colors.primaryForeground, false: "grey" }} />
    </View>
  );
};

const FiltersScreen: NavigationStackScreenComponent<
  MealsNavigationParams,
  FilteresScreenProps
> = (props: FilteresScreenProps) => {
  const [isGluttonFree, setIsGluttonFree] = useState<boolean>(false);
  const [isVegan, setIsVegan] = useState<boolean>(false);
  const [isVegetarian, setIsVegetarian] = useState<boolean>(false);

  const save = useCallback(() => {
    return {
      isGluttonFree, isVegan, isVegetarian
    };
  }, [isGluttonFree, isVegan, isVegetarian]);

  useEffect(() => {
    props.navigation.setParams({ "save": save});
  }, [save]);

  return (
    <View style={styles.screen}>
      <View style={{ marginVertical: 20 }}>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            fontSize: 25,
            textAlign: "center",
          }}
        >
          Available Filters
        </Text>
      </View>

      <SwitchAndText
        text="Glutton Free"
        value={isGluttonFree}
        onToggle={() => setIsGluttonFree((gt) => !gt)}
      />
      <SwitchAndText
        text="Vegan"
        value={isVegan}
        onToggle={() => setIsVegan((gt) => !gt)}
      />
      <SwitchAndText
        text="Vegetarian"
        value={isVegetarian}
        onToggle={() => setIsVegetarian((gt) => !gt)}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = (config) => {
  return {
    headerTitle: "Filters",
    headerLeft: (props) => (
      <HeaderButtons HeaderButtonComponent={MealsHeaderButton}>
        <Item
          title="menu"
          iconName="ios-menu"
          onPress={() => {
            /* this is problem of typing. but the method will exist. Should have used normal react for this. Won't use typescript now */
            config.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (props) => (
      <HeaderButtons HeaderButtonComponent={MealsHeaderButton}>
        <Item
          title="menu"
          iconName="ios-save"
          onPress={() => {
            const savedState = config.navigation.getParam("save")();
            console.log("heloooo")
            console.log(savedState);
          }}
        />
      </HeaderButtons>
    ),
  };
};
export default FiltersScreen;
