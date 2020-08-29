import React, { Fragment, useMemo } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import { FormInputProps } from "./types";
import { FORM_INPUT_CONTAINER_STYLE, FORM_INPUT_TITLE, FORM_INPUT_BAR_STYLE } from "./constants";

const FormikInputText: React.FC<FormInputProps> = (props) => {
  const {
    containerStyle,
    titleStyle,
    inputStyle,
    id,
    formik,
    errorStyle,
  } = props;
  const title = props.title || id;
  const direction = props.direction || "column";

  const styles = useMemo(
    () =>
      StyleSheet.create({
        form: {
          ...FORM_INPUT_CONTAINER_STYLE,
        },
        title: {
          ...FORM_INPUT_TITLE,
          fontSize: 17,
        },
        input: {
          ...FORM_INPUT_BAR_STYLE,
          marginLeft: direction === "row" ? 15 : 0,
          borderBottomWidth: 1,
          flex: direction === "row" ? 1 : undefined,
        },
        error: {
          color: "red",
        },
        textAndInputContainer: {
          flexDirection: direction,
          justifyContent: direction === "row" ? "flex-start" : undefined,
          alignItems: direction === "row" ? "center" : undefined,
        },
      }),
    [direction]
  );
  return (
    <View style={{ ...styles.form, ...containerStyle }}>
      <View style={styles.textAndInputContainer}>
        <Text style={{ ...styles.title, ...titleStyle }}>{title}</Text>
        <TextInput
          onChangeText={formik.handleChange(id)}
          onBlur={formik.handleBlur(id)}
          value={formik.values[id]}
          style={{ ...styles.input, ...inputStyle }}
        />
      </View>
      <Text style={{ ...styles.error, ...errorStyle }}>
        {formik.touched && formik.errors[id] ? formik.errors[id] : ""}
      </Text>
    </View>
  );
};

export default FormikInputText;
