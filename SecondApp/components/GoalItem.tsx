import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Modal } from "react-native";

interface GoalItemProps {
  children: React.ReactNode;
  passedKey: string;
  onPress: (passedKey: string) => void;
}

const styles = StyleSheet.create({
  listItem: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 5,
    marginTop: 5,
    width: "30%",
    justifyContent: "center",
  },
});

const GoalItem: React.FC<GoalItemProps> = props => {
  return (
      <View style={styles.listItem}>
        <TouchableOpacity onPress={(e) => props.onPress(props.passedKey)}>
          <Text>{props.children}</Text>
        </TouchableOpacity>
      </View>
  );
};

export default GoalItem;
