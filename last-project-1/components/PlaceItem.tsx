import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import ContainerWithImageSmall from "../reusable/ContainerWithImageSmall";
import Place from "../models/Place";

type PlaceItemProps =  {
  imageUri: string;
  title: string;
  address: string;
  place: Place;
  onSelect: (place: Place) => void;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    height: 120,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 14,
  },
  textContainer: {
    marginLeft: 20
  },
  imageStyle: {
    borderColor: '#ccc',
    borderWidth: 1,
  }
});

const PlaceItem: React.FC<PlaceItemProps> = (props) => {
  return (
    <ContainerWithImageSmall
      imageUri={props.imageUri}
      imageSize={70}
      touchableStyle={styles.container}
      childrenContainerStyle={styles.textContainer}
      imageStyle={styles.imageStyle}
      id={props.place.id}
      onSelect={() => props.onSelect(props.place)}
    >
      <Text style={styles.text}>{props.title}</Text>
      <Text style={styles.text}>{props.address}</Text>
    </ContainerWithImageSmall>
  );
};

export default PlaceItem;
