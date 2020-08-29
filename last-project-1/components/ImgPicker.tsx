import React, { useState } from "react";
import { Image, StyleSheet, View, Platform, Alert } from "react-native";
import Card from "../reusable/Card";
import CustomButton from "../reusable/CustomButton";
import COLORS from "../constants/colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export type ImageProperties = {
  cancelled: boolean;
  height: number;
  width: number;
  uri: string;
};

type ImgPickerProps = {
  setImageSrc: (src: ImageProperties) => void;
  imageUri: string;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    height: 400,
    width: "80%",
    margin: 20,
    padding: 5,
    overflow: "hidden",
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 20,
    width: "80%",
    height: "80%",
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

const ImgPicker: React.FC<ImgPickerProps> = (props) => {

  const { imageUri } = props;

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (!result.granted) {
      Alert.alert(
        "Permissions Not Granted",
        "Need Camera permissions for this functionality",
        [
          {
            text: "Okay",
          },
        ]
      );
      return false;
    }
    return true;
  };
  const onTakeImageHandler = async () => {
    const granted = await verifyPermissions();
    if (!granted) return;
    ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7
    })
      .then((value) => {
        if (value.cancelled) return;
        const { cancelled, uri, height, width } = value;
        props.setImageSrc({cancelled, uri, height, width});
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Image style={styles.image} source={{ uri: imageUri }} />
      </Card>
      <View style={styles.buttonContainer}>
        <CustomButton
          titleStyle={styles.buttonText}
          title="Add Image"
          style={styles.button}
          onPress={onTakeImageHandler}
        />
      </View>
    </View>
  );
};

export default ImgPicker;
