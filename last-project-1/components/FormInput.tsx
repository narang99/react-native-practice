import React, { Fragment, useMemo } from "react";
import {
  TextInput,
  ViewStyle,
  StyleSheet,
  Text,
  View,
  TextStyle,
} from "react-native";
import { FormikProps } from "formik";

type FormInputProps = {
  id: string;
  title?: string;
  formik: FormikProps<any>;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
  direction?: "row" | "column";
};

const FormInput: React.FC<FormInputProps> = (props) => {
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
          width: "90%",
          marginHorizontal: "5%",
          marginVertical: "2%",
        },
        title: {
          fontSize: 17,
        },
        input: {
          fontSize: 14,
          marginVertical: 5,
          marginLeft: direction === "row" ? 15 : 0,
          marginRight: 5,
          borderBottomWidth: 1,
          flex: direction === "row" ? 1 : undefined,
          borderBottomColor: "#ccc",
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

export default FormInput;
