import React from "react";
import { PropTypes } from "prop-types";
import { StyleSheet, Text, View, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import PlacesHeaderButton from "../components/PlacesHeaderButton";

const styles = StyleSheet.create({});

const PlacesListScreen = (props) => {
  return <View></View>;
};

PlacesListScreen.navigationOptions = (config) => {
  return {
    headerTitle: "Places",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={PlacesHeaderButton}>
        <Item
          iconName={Platform.OS === "andoird" ? "md-add" : "ios-add"}
          title="Add"
          onPress={config.navigation.navigate("AddPlace")}
        />
      </HeaderButtons>
    ),
  };
};

PlacesListScreen.propTypes = {};

PlacesListScreen.defaultProps = {};

export default PlacesListScreen;
