import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import Meal from "../models/Meal";
import colors from "../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

interface MealItemProps {
  item: Meal;
  index: number;
  onPress: (item: Meal, index: number) => void;
}

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%"
  },
  listItem: {
    marginTop: 30,
    marginHorizontal: 30,
    flexGrow: 1,
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    overflow: "hidden",
    height: 250,
  },
  itemHeader: {
    flex: 9,
    width: "100%",
  },
  itemDetails: {
    flex: 1,
    padding: 5,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: colors.primaryBackground,
    justifyContent: "space-around",
  },
  textStyle: {
    fontFamily: "open-sans",
    color: colors.primaryForeground,
  },
  titleStyle: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
    color: colors.primaryForeground
  },
});

const MealItem: React.FC<MealItemProps> = (props) => {
  return (

    <TouchableOpacity style={styles.listItem} onPress={() => props.onPress(props.item, props.index)}>
      <View style={styles.itemHeader}>
        <ImageBackground source={{ uri: props.item.imageUrl}} style={styles.image}>
          <Text style={styles.titleStyle}>{props.item.title}</Text>
        </ImageBackground>
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.textStyle}>
          {props.item.complexity.toUpperCase()}
        </Text>
        <Text style={styles.textStyle}>{props.item.duration}</Text>
        <Text style={styles.textStyle}>
          {props.item.affordability.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MealItem;
