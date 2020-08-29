import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { HeaderButton, HeaderButtonProps } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({});

const CustomHeaderButton: React.FC<HeaderButtonProps> = (props) => {
  return (
    <HeaderButton
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : COLORS.primary}
      {...props}
    />
  );
};

export default CustomHeaderButton;
