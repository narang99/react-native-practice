/* eslint-disable react/display-name */
import React, { useCallback } from "react";
import {
  StyleSheet,
  Platform,
  FlatList,
  Dimensions,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import OrderItem from "../../components/Shop/OrderItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ShopHeaderButton from "../../components/UI/ShopHeaderButton";
import { fetchOrders } from "../../store/actions/orders";
import useLoadingScreen from "../../hooks/useLoadingScreen";
import ScreenWithLoadingActivity from "../../components/UI/ScreenWithLoadingActivity";
import ShopText from "../../components/Shop/ShopText";

const styles = StyleSheet.create({
  orderList: {
    margin: 20,
    alignItems: "center",
  },
});

// eslint-disable-next-line no-unused-vars
const OrderScreen = (props) => {
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();

  const [
    loadingState,
    setScreenLoadingState,
    reloadToggle,
    reloadScreen,
    onSuccess,
    onError,
  ] = useLoadingScreen();

  const onLoad = useCallback((onS, onE) => {
    return dispatch(fetchOrders(onS, onE));
  }, [dispatch]);

  if (orders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ShopText>No Orders found</ShopText>
      </View>
    );
  }

  return (
    <ScreenWithLoadingActivity
      loadingState={loadingState} 
      reloadToggle={reloadToggle}
      onSuccess={onSuccess}
      onError={onError}
      setScreenLoadingState={setScreenLoadingState}
      reloadScreen={reloadScreen}
      onLoad={onLoad}
      showErrorScreen
    >
        <FlatList
          contentContainerStyle={styles.orderList}
          data={orders}
          refreshing={loadingState}
          onRefresh={reloadScreen}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => {
            return (
              <OrderItem
                order={itemData.item}
                screenWidth={Dimensions.get("window").width}
              />
            );
          }}
        />
    </ScreenWithLoadingActivity>
  );
};

OrderScreen.navigationOptions = (config) => {
  return {
    headerTitle: "Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={ShopHeaderButton}>
        <Item
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          iconSize={23}
          title="drawer"
          onPress={() => {
            config.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

OrderScreen.propTypes = {};

OrderScreen.defaultProps = {};

export default OrderScreen;
