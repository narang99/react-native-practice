import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

interface MealsHeaderButtonProps {}

const styles = StyleSheet.create({});

const MealsHeaderButton: React.FC<MealsHeaderButtonProps> = (props) => {
  return (
    <HeaderButton
      title=""
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={colors.primaryForeground}
    />
  );
};

export default MealsHeaderButton;
