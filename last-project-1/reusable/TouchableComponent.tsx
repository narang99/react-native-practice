import React from "react";
import {
  StyleSheet,
  Platform,
  TouchableNativeFeedbackProperties,
  TouchableOpacityProperties,
} from "react-native";
import {
  TouchableNativeFeedback,
  ContainedTouchableProperties,
  TouchableOpacity,
} from "react-native-gesture-handler";

const styles = StyleSheet.create({});

type TouchableComponentProps = (
  | ContainedTouchableProperties
  | TouchableNativeFeedbackProperties
) &
  (ContainedTouchableProperties | TouchableOpacityProperties);

const TouchableComponent: React.FC<TouchableComponentProps> = (props) => {
  if (Platform.OS === "android" && Platform.Version >= 21) {
    return (
      <TouchableNativeFeedback {...props}>
        {props.children}
      </TouchableNativeFeedback>
    );
  } else {
    return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
  }
};

export default TouchableComponent;
