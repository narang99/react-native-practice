import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import CartItem from "./CartItem";
import { PropTypes } from "prop-types";

const styles = StyleSheet.create({
  itemsList: {
    alignItems: "center",
    height: "100%",
    flexGrow: 1,
    // flex: 1,
  },
  itemContainer: {
    // flex:1,
  },
});

const CartItemsList = (props) => {
  return (
    <View style={styles.itemContainer}>
      <FlatList
        keyExtractor={(item) => item.productId}
        data={props.items}
        contentContainerStyle={styles.itemsList}
        renderItem={(itemData) => {
          return (
            <CartItem
              item={itemData.item}
              key={itemData.item.productId}
              containerWidth={props.containerWidth}
              onDelete={props.onCartDelete}
              deletable={props.deletable}
            />
          );
        }}
      />
    </View>
  );
};

CartItemsList.propTypes = {
  items: PropTypes.array,
  containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onCartDelete: PropTypes.func,
  deletable: PropTypes.bool,
};

CartItemsList.defaultProps = {};

export default CartItemsList;
