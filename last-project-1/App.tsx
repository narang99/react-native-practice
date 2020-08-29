import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import PlacesNavigator from "./navigation/PlacesNavigator";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import placesReducer from "./store/places_reducers";
import { RootState } from "./store/types";

const reducers = combineReducers({
  places: placesReducer,
});

const store = createStore(reducers, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
