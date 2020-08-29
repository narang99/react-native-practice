import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { StyleSheet, View, Dimensions } from "react-native";
import ShopText from "./ShopText";
import ShopButton from "./ShopButton";
import CartItemsList from "./CartItemsList";
import Card from "../UI/Card";

const MARGIN_HORIZONTAL = 30;
const styles = StyleSheet.create({
  orderItem: {
    padding: 30,
    paddingVertical: 20,
    width: Dimensions.get("window").width - 2 * MARGIN_HORIZONTAL,
    borderRadius: 10,
    margin: 15,
    alignItems: "center",
  },
  dateAmount: {
    flexDirection: "row",
    marginBottom: 5,
  },
  amount: {
    flex: 1,
    textAlign: "left",
    padding: 5,
  },
  date: {
    flex: 1,
    textAlign: "right",
    padding: 5,
  },
  detailsButtonContainer: {
    height: 40,
  },
  details: {
  },
});

const OrderItem = (props) => {
  const { order } = props;
  const width = props.screenWidth - 2 * MARGIN_HORIZONTAL;
  const [showDetails, setShowDetails] = useState(false);
  const onShowDetails = () => setShowDetails((sd) => !sd);

  return (
    <Card style={{ ...styles.orderItem, width }}>
      <View style={styles.dateAmount}>
        <ShopText style={styles.amount}>${order.amount}</ShopText>
        <ShopText style={styles.date}>{order.readableDate}</ShopText>
      </View>

      <View style={styles.detailsButtonContainer}>
        <ShopButton
          title={showDetails ? "Hide Details" : "Show Details"}
          onPress={onShowDetails}
        />
      </View>
      {showDetails && (
        <View style={styles.details}>
          <CartItemsList
            items={props.order.cartItems}
            onCartDelete={() => {}}
            containerWidth={"100%"}
            deletable={false}
          />
        </View>
      )}
    </Card>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object,
  screenWidth: PropTypes.number,
};

OrderItem.defaultProps = {};

export default OrderItem;
