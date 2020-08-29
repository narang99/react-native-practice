import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

interface AppProps {}

interface ListItemInterface {
  key: string;
  value: string;
}

const styles = StyleSheet.create({
  list: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  root: {
    paddingTop: 80,
  },
});

const App: React.FC<AppProps> = (props) => {
  const [listOfAdded, setListOfAdded] = useState<Array<ListItemInterface>>([]);
  const [showGoalInput, setShowGoalInput] = useState<boolean>(false);

  const OnGoalInputAdd: (value: string) => void = (value) => {
    const nextKey: string | undefined =
      listOfAdded.length === 0
        ? "0"
        : (
            Number.parseInt(listOfAdded[listOfAdded.length - 1].key) + 1
          ).toString();
    const k: string = nextKey === undefined ? "0" : nextKey;
    setListOfAdded([...listOfAdded, { key: k, value: value }]);
    /* close the modal */
    setShowGoalInput(false);
  };
  const onGoalInputCancel: () => void = () => {
    setShowGoalInput(false);
  };

  const onItemDelete: (key: string) => void = (key) => {
    setListOfAdded(listOfAdded.filter((item) => item.key !== key));
  };

  const modalShowTitle: string = "Add";
  const modalShowOnPress: () => void = () => setShowGoalInput(true);

  return (
    <View style={styles.root}>
      <Button title={modalShowTitle} onPress={modalShowOnPress} />
      <GoalInput
        onCancel={onGoalInputCancel}
        onAdd={OnGoalInputAdd}
        visible={showGoalInput}
      />
      <FlatList
        contentContainerStyle={styles.list}
        data={listOfAdded}
        renderItem={(listItem) => (
          <GoalItem passedKey={listItem.item.key} onPress={onItemDelete}>
            {listItem.item.value}
          </GoalItem>
        )}
      />
    </View>
  );
};
export default App;
