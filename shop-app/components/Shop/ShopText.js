import React  from "react";
import { PropTypes } from 'prop-types';
import {  Text } from "react-native";

const ShopText = (props) => {
  let textStyle;
  if (props.type === "title") {
    textStyle = {
      "fontFamily": "open-sans-bold",
      fontSize: 17,
    };
  } else if (props.type === "normal") {
    textStyle = {
      "fontFamily": "open-sans",
      fontSize: 12,
    };
  }
  return (
    <Text style={{ ...textStyle, ...props.style }} {...props.textProps}>
      {props.children}
    </Text>
  );
};

ShopText.defaultProps = {
  textProps: {},
  style: {},
  children: "",
  type: "normal",
};

ShopText.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
  type: PropTypes.string,
  textProps: PropTypes.object,
};

export default ShopText;
