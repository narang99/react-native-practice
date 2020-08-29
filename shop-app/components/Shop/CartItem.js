import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { PropTypes } from "prop-types";
import { Ionicons } from "@expo/vector-icons";

import ShopText from "./ShopText";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";
import colors from "../../constants/colors";

const MARGIN_HORIZONTAL = 20;

const styles = StyleSheet.create({
  price: {
    margin: 2,
    textAlign: "center",
    fontFamily: "open-sans-bold",
    fontSize: 14,
  },
  touchableStyle: {
    margin: 5,
  },
  itemDetailsText: {
    margin: 3,
    fontSize: 14,
    fontFamily: "open-sans-bold",
  },
  iconPriceContainer: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
  },
  itemDetails: {
    flexDirection: "row",
    width: "70%",
    textAlign: "left",
  },
  itemContainer: {
    width: "90%",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
});

const CartItem = (props) => {
  const { item } = props;
  const { quantity, price, productTitle } = item;
  const TouchableCmp =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  const onDeletePress = () => props.onDelete(item);

  const width =
    typeof props.containerWidth === "number"
      ? props.containerWidth - 2 * MARGIN_HORIZONTAL
      : props.containerWidth;
  return (
    <View style={{ ...styles.itemContainer, width: width }}>
      <View style={styles.itemDetails}>
        <ShopText style={styles.itemDetailsText}>{productTitle}</ShopText>
        <ShopText style={{ ...styles.itemDetailsText, color: "#888" }}>
          {quantity}
        </ShopText>
      </View>
      <View style={styles.iconPriceContainer}>
        <ShopText style={styles.price}>{price}</ShopText>
        {props.deletable && (
          <TouchableCmp style={styles.touchableStyle} onPress={onDeletePress}>
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color={colors.primary}
            />
          </TouchableCmp>
        )}
      </View>
    </View>
  );
};

CartItem.propTypes = {
  deletable: PropTypes.bool,
  onDelete: PropTypes.func,
  styleProps: PropTypes.object,
  item: PropTypes.object,
  containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

CartItem.defaultProps = {
  deletable: true,
  styleProps: {},
  onDelete: () => {},
};

export default CartItem;
