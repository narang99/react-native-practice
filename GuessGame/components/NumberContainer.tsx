import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

interface NumberContainerProps {}

const styles = StyleSheet.create({
  numberContainer: {
    borderColor: colors.accent,
    borderRadius: 17,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 14,
    margin: 12,
  },
  number: {
    fontSize: 40,
    color: colors.accent,
  },
});

const NumberContainer: React.FC<NumberContainerProps> = (props) => {
  return (
    <View style={styles.numberContainer}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};
export default NumberContainer;
