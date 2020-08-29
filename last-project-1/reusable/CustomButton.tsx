import React from "react";
import { StyleSheet, Text, View, ViewStyle, TextStyle, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import TouchableComponent from "./TouchableComponent";

interface CustomButtonProps {
  onPress?: () => void;
  style?: ViewStyle;
  title: string;
  titleStyle?: TextStyle;
}

const styles = StyleSheet.create({
  touchable:  {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 5,
  }
});

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const onPress = props.onPress ? props.onPress : () => {};
  return (
    <TouchableComponent
      onPress={onPress}
      style={{ ...styles.touchable, ...props.style }}
    >
      <Text style={props.titleStyle}>{props.title}</Text>
    </TouchableComponent>
  );
};

export default CustomButton;
