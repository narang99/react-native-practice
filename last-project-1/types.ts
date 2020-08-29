import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import Place from "./models/Place";

export type PlaceStackParamList = {
  Places: undefined;
  PlaceDetail: { place: Place };
  Map: undefined;
  NewPlace: undefined;
};

export type MapScreenNavigation = StackNavigationProp<
  PlaceStackParamList,
  "Map"
>;
export type MapScreenRoute = RouteProp<PlaceStackParamList, "Map">;
export type MapScreenProps = {
  navigation: MapScreenNavigation;
  route: MapScreenRoute;
};

export type PlaceListScreenNavigation = StackNavigationProp<
  PlaceStackParamList,
  "Places"
>;
export type PlaceListScreenRoute = RouteProp<PlaceStackParamList, "Places">;
export type PlaceListScreenProps = {
  navigation: PlaceListScreenNavigation;
  route: PlaceListScreenRoute;
};

export type PlaceDetailScreenNavigation = StackNavigationProp<
  PlaceStackParamList,
  "PlaceDetail"
>;
export type PlaceDetailScreenRoute = RouteProp<
  PlaceStackParamList,
  "PlaceDetail"
>;
export type PlaceDetailScreenProps = {
  navigation: PlaceDetailScreenNavigation;
  route: PlaceDetailScreenRoute;
};

export type NewPlaceScreenNavigation = StackNavigationProp<
  PlaceStackParamList,
  "NewPlace"
>;
export type NewPlaceScreenRoute = RouteProp<PlaceStackParamList, "NewPlace">;
export type NewPlaceScreenProps = {
  navigation: NewPlaceScreenNavigation;
  route: NewPlaceScreenRoute;
};
