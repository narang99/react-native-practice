import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { PlaceListScreenProps } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../store/types";
import PlaceItem from "../components/PlaceItem";
import Place from "../models/Place";

const styles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

const PlaceListScreen: React.FC<PlaceListScreenProps> = (props) => {
  const places = useSelector((state: RootState) => state.places.places);
  const onPlaceItemSelect = (place: Place) => {
    props.navigation.navigate("PlaceDetail", {
      place,
    });
  };

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          imageUri={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
          place={itemData.item}
          onSelect={onPlaceItemSelect}
        />
      )}
    />
  );
};

export default PlaceListScreen;
