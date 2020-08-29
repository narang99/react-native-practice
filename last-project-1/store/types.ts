import { ThunkAction, ThunkDispatch } from "redux-thunk";
import Place from "../models/Place";
import { Action, CombinedState } from "redux";

export const ADD_PLACE = "ADD_PLACE";
interface AddPlaceAction {
  type: typeof ADD_PLACE;
  title: string;
  address: string;
  imageUri: string;
}

export const UPDATE_PLACE = "UPDATE_PLACE";
interface UpdatePlaceAction {
  type: typeof UPDATE_PLACE;
  place: Place;
};



export type PlacesState = {
  places: Array<Place>;
};

export type PlaceThunkAction<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  PlacesState,
  any,
  Action<string>
>;

export type PlacesThunkDispatch<> = ThunkDispatch<PlacesState, any, Action<string>>;

export type PlacesActions = AddPlaceAction | UpdatePlaceAction;
 

export type RootState = CombinedState<{
  places: PlacesState,
}>;
