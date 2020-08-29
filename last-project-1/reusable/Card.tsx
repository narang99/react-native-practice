import React from "react";
import {
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    shadowColor: '#ccc',
    shadowOffset: { height: 2, width: 2},
    shadowOpacity: 0.26,
    shadowRadius: 5,
    elevation: 15,
  }
});

const Card: React.FC<{style?: ViewStyle}> = (props) => {
    const { style } = props;

  return <View style={{...styles.card, ...style}}>
    {props.children}
  </View>;
};

export default Card;
