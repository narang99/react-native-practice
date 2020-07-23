import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { PropTypes } from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({});

const PlacesHeaderButton = (props) => {
  return (
    <HeaderButton
      IconComponent={Ionicons}
      color={Platform.OS === "android" ? "white" : Colors.primary}
      iconSize={23}
      {...props}
    />
  );
};

PlacesHeaderButton.propTypes = {};


export default PlacesHeaderButton;
