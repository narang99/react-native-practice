import { PlaceThunkAction, ADD_PLACE, UPDATE_PLACE } from "./types";
import * as FileSystem from "expo-file-system";
import Place from "../models/Place";
import PlacesNavigator from "../navigation/PlacesNavigator";

export const addPlace: (
  title: string,
  address: string,
  imageUri: string
) => PlaceThunkAction = (title, address, imageUri) => {
  return async (dispatch) => {
    if (FileSystem.documentDirectory === null) {
      throw new Error("document directory is null, could not store");
    }
    const nPath =
      imageUri !== ""
        ? FileSystem.documentDirectory + imageUri.split("/").pop()
        : "";
    try {
      if (nPath !== "") {
        await FileSystem.moveAsync({
          from: imageUri,
          to: nPath,
        });
        console.log("uupdated and moved to fs", nPath);
      }
    } catch (err) {
      console.log(err.message);
      throw err;
    }
    dispatch({ type: ADD_PLACE, title, address, imageUri: nPath });
  };
};

export const updatePlace: (place: Place) => PlaceThunkAction = (
  place
) => async (dispatch) => {
  console.log('update called');
  if (FileSystem.documentDirectory === null) {
    throw new Error("document directory is null, could not store");
  }
  const { imageUri } = place;
  const nPath =
    imageUri !== ""
      ? FileSystem.documentDirectory + imageUri.split("/").pop()
      : "";
  try {
    if (nPath !== "") {
      console.log('trying');
      await FileSystem.moveAsync({
        from: imageUri,
        to: nPath,
      });
      console.log("uupdated and moved to fs", nPath);
      place.imageUri = nPath;
    }
  } catch (err) {
    console.log(err.message);
    throw err;
  }
  dispatch({ type: UPDATE_PLACE, place });
};
