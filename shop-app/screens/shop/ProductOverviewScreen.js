/* eslint-disable react/display-name */
import React, { useCallback } from "react";
import { Platform } from "react-native";
import { useSelector } from "react-redux";
import ProductItemsList from "../../components/Shop/ProductItemsList";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ShopHeaderButton from "../../components/UI/ShopHeaderButton";
import useScreenSize from "../../hooks/useScreenSize";
import { PropTypes } from "prop-types";
import { fetchProducts } from "../../store/actions/products";
import ScreenWithLoadingActivity from "../../components/UI/ScreenWithLoadingActivity";
import useLoadingScreen from "../../hooks/useLoadingScreen";

const ProductOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const { screenWidth } = useScreenSize();

  const onViewDetails = async (prod) => {
    props.navigation.navigate({
      routeName: "ProductDetail",
      params: {
        productId: prod.id,
        productTitle: prod.title,
      },
    });
  };
  const dispatch = useDispatch();
  const onAddToCart = (prod) => {
    dispatch(addToCart(prod));
  };

  // not using error for now.
  const [
    loadingState,
    setScreenLoadingState,
    reloadToggle,
    reloadScreen,
    onSuccess,
    onError,
  ] = useLoadingScreen();

  const onLoad = useCallback(
    (onSc, onEr) => {
      return dispatch(fetchProducts(onSc, onEr));
    },
    [dispatch]
  );

  const numColumns = 1;
  return (
    <ScreenWithLoadingActivity
      onLoad={onLoad}
      onSuccess={onSuccess}
      onError={onError}
      isOnLoadCleanable={true}
      reloadToggle={reloadToggle}
      setScreenLoadingState={setScreenLoadingState}
      showErrorScreen
    >
      <ProductItemsList
        numColumns={numColumns}
        products={products}
        containerWidth={screenWidth}
        leftTitle="View Details"
        showLeft
        onLeftButtonClick={onViewDetails}
        rightTitle="Add to Cart"
        showRight
        onRightButtonClick={onAddToCart}
        onProductSelect={onViewDetails}
        refreshing={loadingState}
        onRefresh={reloadScreen}
      />
    </ScreenWithLoadingActivity>
  );
};

ProductOverviewScreen.navigationOptions = (config) => {
  return {
    headerTitle: "Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={ShopHeaderButton}>
        <Item
          title="cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            config.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
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

ProductOverviewScreen.propTypes = {
  navigation: PropTypes.object,
};

export default ProductOverviewScreen;
