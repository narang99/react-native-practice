/* eslint-disable react/display-name */
import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import {
  createAppContainer,
  createSwitchNavigator,
  SafeAreaView,
} from "react-navigation";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import OrderScreen from "../screens/shop/OrderScreen";
import CartScreen from "../screens/shop/CartScreen";
import colors from "../constants/colors";
import { Platform, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/shop/AuthScreen";
import ShopButton from "../components/Shop/ShopButton";
import { firebase } from "../backend/firebase/firebase";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? colors.primary : "white",
  },
  headerTitleAlign: "center",
  headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
};
const ProductsStackNavigator = createStackNavigator(
  {
    ProductOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions,
  }
);

const OrderStackNavigator = createStackNavigator(
  {
    Orders: OrderScreen,
  },
  {
    defaultNavigationOptions,
  }
);

const AdminStackNavigator = createStackNavigator(
  {
    Users: UserProductScreen,
    Edit: EditProductScreen,
  },
  {
    defaultNavigationOptions,
  }
);

const mainDrawerNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductsStackNavigator,
      navigationOptions: {
        drawerIcon: (drawerConfig) => {
          return (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={drawerConfig.tintColor}
            />
          );
        },
      },
    },
    Orders: {
      screen: OrderStackNavigator,
      navigationOptions: {
        drawerIcon: (drawerConfig) => {
          return (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={drawerConfig.tintColor}
            />
          );
        },
      },
    },
    Admin: {
      screen: AdminStackNavigator,
      navigationOptions: {
        drawerIcon: (drawerConfig) => {
          return (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={drawerConfig.tintColor}
            />
          );
        },
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: colors.primary,
    },
    contentComponent: (props) => {
      const signOutHandler = () => {
        firebase
          .auth()
          .signOut()
          .then((result) => props.navigation.navigate("Auth"))
          .catch((err) => console.log("could not sign out"));
      };
      return (
        <View>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <ShopButton
                title="Logout"
                buttonStyle={{ borderRadius: 0, height: 30, width: 70 }}
                onPress={signOutHandler}
              />
            </View>
          </SafeAreaView>
        </View>
      );
    },
  }
);

const authNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions,
  }
);

const mainNavigator = createSwitchNavigator({
  Auth: authNavigator,
  Shop: mainDrawerNavigator,
});

export default createAppContainer(mainNavigator);
