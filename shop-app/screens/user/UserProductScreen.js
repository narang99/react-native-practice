import React from "react";
import { PropTypes } from "prop-types";
import { StyleSheet, View, Platform, Alert } from "react-native";
import ProductItemsList from "../../components/Shop/ProductItemsList";
import { useSelector, useDispatch } from "react-redux";
import useScreenSize from "../../hooks/useScreenSize";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ShopHeaderButton from "../../components/UI/ShopHeaderButton";
import { deleteProduct } from "../../store/actions/products";
import ShopText from "../../components/Shop/ShopText";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

const AsyncAlert = (title, message, buttons) => {
  return new Promise((resolve) => {
    const buttonsToPass = buttons.map((button) => {
      return {
        text: button.text,
        style: button.style,
        onPress: () => resolve(button.text),
      };
    });
    Alert.alert(title, message, buttonsToPass, { cancelable: false });
  });
};

// eslint-disable-next-line no-unused-vars
const UserProductScreen = (props) => {
  const products = useSelector((state) => state.products.userProducts);
  const { screenWidth } = useScreenSize();
  const onEditHandler = (product) => {
    props.navigation.navigate("Edit", {
      product: product,
    });
  };
  const dispatch = useDispatch();
  const onRemoveHandler = async (product) => {
    const pressed = await AsyncAlert(
      "Are you sure?",
      "Delete this item premanently",
      [
        { text: "Yes", style: "destructive" },
        { text: "No", style: "default" },
      ]
    );
    if (pressed === "Yes") {
      await dispatch(deleteProduct(product));
    }
  };

  if (products.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ShopText>No Products available</ShopText>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ProductItemsList
        products={products}
        numColumns={1}
        containerWidth={screenWidth}
        leftTitle="Edit"
        showLeft
        onLeftButtonClick={onEditHandler}
        rightTitle="Remove"
        showRight
        onRightButtonClick={onRemoveHandler}
        onProductSelect={onEditHandler}
      />
    </View>
  );
};

UserProductScreen.navigationOptions = (config) => {
  return {
    headerTitle: "User",
    // eslint-disable-next-line react/display-name
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
    // eslint-disable-next-line react/display-name
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={ShopHeaderButton}>
        <Item
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          iconSize={23}
          title="addProduct"
          onPress={() => config.navigation.navigate("Edit")}
        />
      </HeaderButtons>
    ),
  };
};

UserProductScreen.propTypes = {
  navigation: PropTypes.object,
};

UserProductScreen.defaultProps = {};

export default UserProductScreen;
