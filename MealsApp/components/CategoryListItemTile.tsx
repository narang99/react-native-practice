import React from "react";
import { TouchableOpacity, FlatList, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import Category from "../models/Category";

interface CategoryListItemTileProps {
  item: Category;
  index: number;
  onPress: (item: Category, index: number) => void;
}

const styles = StyleSheet.create({
  listItemText: {
    fontFamily: "open-sans-bold",
    color: colors.accentForeground,
    fontSize: 16,
    textAlignVertical: "bottom",
    textAlign: "right"
  },
  listItem: {
    margin: 20,
    padding: 15,
    height: 150,
    width: 150,
    justifyContent: "flex-end",
    borderWidth: 1,
    borderColor: colors.accentForeground,
    alignItems: "flex-end",
    elevation: 3,
    borderRadius: 10,
    lineHeight: 2
  },
});

const CategoryListItemTile: React.FC<CategoryListItemTileProps> = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.listItem, backgroundColor: props.item.color }}
      onPress={() => props.onPress(props.item, props.index)}
    >
        <Text numberOfLines={2} style={styles.listItemText}>{props.item.title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryListItemTile;
