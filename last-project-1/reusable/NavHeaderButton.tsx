import React from "react";
import { Platform } from "react-native";
import CustomHeaderButton from "./CustomHeaderButton";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import { NavHeaderButtonProps } from "./types";

const NavHeaderButton: React.FC<NavHeaderButtonProps> = (props) => {
  const { navigation, androidIconName, iosIconName, title } = props;
  const onPress = props.onPress ? props.onPress : () => {};

  return (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title={title}
        iconName={Platform.OS === "android" ? androidIconName : iosIconName}
        onPress={() => onPress(title)}
      />
    </HeaderButtons>
  );
};

export default NavHeaderButton;
