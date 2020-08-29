import React, { useState } from "react";
import { Image, StyleSheet, Text, View, Button, Platform } from "react-native";
import { PlaceDetailScreenProps } from "../types";
import Card from "../reusable/Card";
import CustomButton from "../reusable/CustomButton";
import COLORS from "../constants/colors";
import ImgPicker, { ImageProperties } from "../components/ImgPicker";
import { useDispatch } from "react-redux";
import { ADD_PLACE } from "../store/types";
import { addPlace, updatePlace } from "../store/places_actions";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    marginTop: 20,
    fontSize: 25,
  },
  address: {
    fontSize: 14,
    textAlign: "center",
  },
  card: {
    height: 400,
    width: "80%",
    margin: 20,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: Platform.OS === "android" ? COLORS.primary : "white",
    borderRadius: 5,
    width: 100,
  },
  buttonText: {
    color: Platform.OS === "android" ? "white" : COLORS.primary,
  },
});

const PlaceDetailScreen: React.FC<PlaceDetailScreenProps> = (props) => {
  const { place } = props.route.params;
  const [imgSrc, setImgSrc] = useState(place.imageUri);
  const setImg = (src: ImageProperties): void => {
    setImgSrc(src.uri);
  };
  const dispatch = useDispatch();
  const saveHandler = async () => {
    const p = { ...place };
    p.imageUri = imgSrc;
    await dispatch(updatePlace(p));
    props.navigation.goBack();
  };
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{place.title}</Text>
      <Text style={styles.address}>{place.address}</Text>
      <ImgPicker setImageSrc={setImg} imageUri={imgSrc} />
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Save"
          onPress={saveHandler}
          style={styles.button}
          titleStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

export default PlaceDetailScreen;
