/* eslint-disable react/display-name */
import React from "react";
import { StyleSheet, View, Image, Platform } from "react-native";
import ShopText from "../../components/Shop/ShopText";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import ShopButton from "../../components/Shop/ShopButton";
import { addToCart } from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ShopHeaderButton from "../../components/UI/ShopHeaderButton";
import { PropTypes } from "prop-types";

const styles = StyleSheet.create({
  price: {
    fontSize: 20,
    color: "#222",
  },
  descriptionText: {
    fontSize: 20,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
  },
  titleContainer: {
    flex: 2,
    marginBottom: 3,
  },
  buttonTitleContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
    height: 70,
  },
  buttonContainer: {
    flex: 3,
  },
  image: {
    width: "90%",
    height: 400,
  },
  screen: {
    flexGrow: 1,
  },
  descriptionContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
});

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const product = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  const dispatch = useDispatch();
  const onAddToCart = () => {
    dispatch(addToCart(product));
  };
  return (
    <ScrollView contentContainerstyle={styles.screen}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
      </View>
      <View style={styles.buttonTitleContainer}>
        <View style={styles.titleContainer}>
          <ShopText type="title" style={styles.price}>
            ${product.price}
          </ShopText>
        </View>
        <View style={styles.buttonContainer}>
          <ShopButton title="Add to Cart" onPress={onAddToCart} />
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <ShopText textStyle={styles.descriptionText}>
          {product.description}
        </ShopText>
      </View>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (config) => {
  return {
    headerTitle: config.navigation.getParam("productTitle"),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={ShopHeaderButton}>
        <Item
          title="cart"
          iconName={Platform.OS === "android" ? "md-cart" : "md-cart"}
          onPress={() => {
            config.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

ProductDetailScreen.propTypes = {
  navigation: PropTypes.object,
};

export default ProductDetailScreen;
