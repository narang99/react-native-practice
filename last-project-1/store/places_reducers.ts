import { PlacesState, PlacesActions, ADD_PLACE, UPDATE_PLACE } from "./types";
import Place from "../models/Place";
const initialState: PlacesState = {
  places: [],
};

export default (state = initialState, action: PlacesActions) => {
  switch (action.type) {
    case ADD_PLACE: {
      return {
        ...state,
        places: state.places.concat(
          new Place(
            new Date().toString(),
            action.title,
            action.address,
            action.imageUri
          )
        ),
      };
    }
    case UPDATE_PLACE: {
      const index = state.places.findIndex(
        (place) => place.id === action.place.id
      );
      if (index === -1) return state;
      const places = [...state.places];
      places[index] = action.place;
      return {
        ...state,
        places,
      };
    }
    default:
      return state;
  }
};
