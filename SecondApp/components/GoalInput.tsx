import React from "react";
import { useState } from "react";
import { Modal, Button, StyleSheet, TextInput, View, BackHandler } from "react-native";

interface GoalInputProps {
  onAdd: (value: string) => void;
  onCancel: () => void;
  visible?: boolean;
}

const styles = StyleSheet.create({
  textInputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  textInput: {
    paddingBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  buttonsView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch"
  },
  buttonView: {
    flex: 1
  },
});

const GoalInput: React.FC<GoalInputProps> = (props) => {
  const [enteredText, setEnteredText] = useState<string>("");
  const onChangeText: (entered: string) => void = (entered) => {
    setEnteredText(entered);
  };

  const onAddButtonPress: () => void = () => {
    props.onAdd(enteredText);
    setEnteredText("");
  };

  const onCancelButtonPress: () => void = () => {
    setEnteredText("");
    props.onCancel();
  };

  return (
    <Modal visible={props.visible} animationType="fade">
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Add Text..."
          style={styles.textInput}
          value={enteredText}
          onChangeText={onChangeText}
        />
        <View style={styles.buttonsView}>
          <View style={{...styles.buttonView, backgroundColor: "brown"}} >
            <Button onPress={onCancelButtonPress} title="CANCEL" color="red" />
          </View>
          <View style={ {...styles.buttonView, backgroundColor: "grey"} } >
            <Button onPress={onAddButtonPress} title="ADD" />
          </View>
        </View>
      </View>
    </Modal>
  );
};
GoalInput.defaultProps = {
  visible: false,
};

export default GoalInput;
