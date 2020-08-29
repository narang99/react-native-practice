import React from "react";
import { ViewStyle, TextInput, TextInputProps, View, StyleSheet } from "react-native";
import colors from "../constants/colors";

interface CustomTextInputProps {
  style: ViewStyle;
  textInputProps: TextInputProps;
}

const styles = StyleSheet.create({
  textInput: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

const CustomTextInput: React.FC<CustomTextInputProps> = (props) => {
  return <TextInput {...props.textInputProps} style={{ ...styles.textInput, ...props.style }}  />;
};

export default CustomTextInput;
