import React from "react";
import { Picker, StyleSheet, Text, View } from "react-native";
import { FormikPickerProps } from "./types";
import {
  FORM_INPUT_CONTAINER_STYLE,
  FORM_INPUT_TITLE,
  FORM_INPUT_BAR_STYLE,
} from "./constants";

const styles = StyleSheet.create({
  picker: {
    ...FORM_INPUT_BAR_STYLE,
  },
  pickerItem: {},
  container: {
    ...FORM_INPUT_CONTAINER_STYLE,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    ...FORM_INPUT_TITLE,
  },
});

const FormikPicker: React.FC<FormikPickerProps> = (props) => {
  const {
    enabled,
    mode,
    pickerStyle,
    items,
    formik,
    id,
    pickerItemStyle,
    pickerContainerStyle,
    titleStyle,
  } = props;
  const title = props.title || id;
  return (
    <View style={{ ...styles.container, ...pickerContainerStyle }}>
      <Text style={{ ...styles.title, ...titleStyle }}>{title}</Text>
      <Picker
        style={{ ...styles.picker, ...pickerStyle }}
        onValueChange={(itemValue) => {
          formik.setFieldValue(id, itemValue);
        }}
        selectedValue={formik.values[id]}
        itemStyle={{ ...styles.pickerItem, ...pickerItemStyle }}
        enabled={enabled}
        mode={mode}
      >
        {items.map((item, index) => (
          <Picker.Item key={index} {...item} />
        ))}
      </Picker>
    </View>
  );
};

export default FormikPicker;
