import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface CardProps {
  style: ViewStyle;
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 10,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});

const Card: React.FC<CardProps> = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

export default Card;
