import React from "react";
import { PropTypes } from "prop-types";
import { StyleSheet, View, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ShopText from "./ShopText";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: (Platform.OS === "android") ? colors.primary : null,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 1,
    height: "100%",
    marginHorizontal: 5,
    justifyContent: "center"
  },
  text: {
    color: (Platform.OS === "android") ? "white" : colors.primary,
    fontSize: 13,
    textAlign: "center"
  },
});

const ShopButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
      <View style={{ ...styles.buttonContainer, ...props.buttonStyle }}>
        <ShopText style={{ ...styles.text, ...props.textStyle }}>
          {props.title}
        </ShopText>
      </View>
    </TouchableOpacity>
  );
};

ShopButton.defaultProps = {
  buttonStyle: {},
  textStyle: {},
  onPress: () => {},
};

ShopButton.propTypes = {
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
  title: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ShopButton;
