import React from "react";
import { StyleSheet, Text, View, ViewStyle, TextStyle } from "react-native";

interface ListItemProps {
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    margin: 3,
    paddingVertical: 3,
    paddingHorizontal: 7,
    flexGrow: 1
  },
  text: {
    fontFamily: "open-sans",
    fontSize: 18,
    textAlign: "center",
  },
});

const ListItem: React.FC<ListItemProps> = (props) => {
  return (
    <View style={{ ...styles.container, ...props.containerStyle }}>
      <Text style={{ ...styles.text, ...props.textStyle }}>
        {props.children}
      </Text>
    </View>
  );
};

ListItem.defaultProps = {
  textStyle: {},
  containerStyle: {},
};

export default ListItem;
