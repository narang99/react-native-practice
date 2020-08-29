import React, { useState } from "react";
import { AppLoading } from "expo";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import { composeWithDevTools } from "redux-devtools-extension";
import productsReducer from "./store/reducers/products";
import orderReducer from "./store/reducers/orders";
import cartReducer from "./store/reducers/cart";
import ShopNavigator from "./navigation/ShopNavigator";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
});

const fetchFonts = () => {
  return Font.loadAsync({
    // eslint-disable-next-line no-undef
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    // eslint-disable-next-line no-undef
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const middlewares = [ReduxThunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

console.ignoredYellowBox = ["Setting a timer"];

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  if (isLoading) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsLoading(false)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
};

export default App;
