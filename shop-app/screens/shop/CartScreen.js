import React from "react";
import { StyleSheet, View } from "react-native";
import ShopText from "../../components/Shop/ShopText";
import ShopButton from "../../components/Shop/ShopButton";
import { useSelector, useDispatch } from "react-redux";
import colors from "../../constants/colors";
import useScreenSize from "../../hooks/useScreenSize";
import { deleteFromCart, clearCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/orders";
import CartItemsList from "../../components/Shop/CartItemsList";
import Card from "../../components/UI/Card";

const styles = StyleSheet.create({
  itemsList: {
    alignItems: "center",
  },
  screen: {
    margin: 20,
    flex: 1,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-around",
    marginBottom: 20,
    padding: 10,
    height: 70,
  },
  amount: {
    fontFamily: "open-sans-bold",
    color: colors.primary,
    fontSize: 16,
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 16,
  },
  itemsContainer: {},
});

// eslint-disable-next-line no-unused-vars
const CartScreen = (props) => {
  const amount = useSelector((state) => state.cart.amount);
  const items = useSelector((state) => state.cart.items);
  const getArrayOfCartItems = (items) => {
    const a = [];
    for (const key in items) {
      const cItem = items[key];
      a.push({
        productTitle: cItem.productTitle,
        productId: key,
        product: cItem.product,
        quantity: cItem.quantity,
        sum: cItem.sum,
        price: cItem.price,
      });
    }
    return a.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  };
  const cItemsArray = getArrayOfCartItems(items);
  const { screenWidth } = useScreenSize();
  const dispatch = useDispatch();
  const onCartDelete = (cartItem) => {
    dispatch(deleteFromCart(cartItem));
  };
  const onOrderPress = async () => {
    if (cItemsArray.length > 0) {
      try {
        dispatch(addOrder(cItemsArray, amount));
        dispatch(clearCart());
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Card style={styles.screen}>
      <View style={styles.summary}>
        <ShopText style={styles.summaryText}>
          Total: <ShopText style={styles.amount}>${amount.toFixed(2)}</ShopText>
        </ShopText>
        <ShopButton
          title="Order Now"
          buttonStyle={{
            height: 35,
            backgroundColor: cItemsArray.length > 0 ? colors.primary : "#888",
          }}
          onPress={onOrderPress}
        />
      </View>
      <View style={styles.itemsContainer}>
        <CartItemsList
          deletable={true}
          containerWidth={screenWidth}
          onCartDelete={onCartDelete}
          items={cItemsArray}
        />
      </View>
    </Card>
  );
};

CartScreen.propTypes = {};

CartScreen.defaultProps = {};

export default CartScreen;
