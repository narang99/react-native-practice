import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { StyleSheet, TextInput, View } from "react-native";
import ShopText from "../Shop/ShopText";

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  textBeforeInput: {
    fontSize: 19,
    fontFamily: "open-sans-bold",
    marginRight: 5,
  },
  textInputBar: {},
  textInputBarContainer: {
    borderBottomWidth: 1,
    padding: 4,
  },
  error: {
    color: "red",
  },
});

const ShopInput = (props) => {
  const [input, setInput] = useState(props.initialValue);
  const [isValid, setIsValid] = useState(props.initialValidity);
  const [touched, setTouched] = useState(false);

  const { onChangeText } = props;
  const validate = (text) => {
    text = text.trim();
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (props.required && text.length === 0) {
      return false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      return false;
    }
    if (props.decimal && Number.isNaN(Number.parseFloat(text))) {
      return false;
    } else {
      if (props.min != null && +text < props.min) {
        return false;
      }
      if (props.max != null && +text > props.max) {
        return false;
      }
    }
    if (props.minLength != null && text.length < props.minLength) {
      return false;
    }
    return true;
  };
  const inputChangeHandler = (value) => {
    setInput(value);
    if (validate(value)) {
      // only valid input goes
      setIsValid(true);
      onChangeText(props.id, value);
    } else {
      setIsValid(false);
    }
  };

  const blurHandler = () => {
    if (!touched) setTouched(true);
  };
  return (
    <View style={ {...styles.inputContainer, ...props.contentContainerStyle} }>
      <ShopText style={ {...styles.textBeforeInput, ...props.labelStyle} }>{props.label}</ShopText>
      <View style={styles.textInputBarContainer}>
        <TextInput
          style={ {...styles.textInputBar, ...props.textInputBarStyle} }
          value={input}
          onChangeText={inputChangeHandler}
          onBlur={blurHandler}
          {...props.textInputProps}
        />
      </View>
      {touched && !isValid && (
        <ShopText style={styles.error}>{props.errorMessage}</ShopText>
      )}
    </View>
  );
};

ShopInput.propTypes = {
  label: PropTypes.string,
  onChangeText: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  errorMessage: PropTypes.string,
  initialValidity: PropTypes.bool,
  initialValue: PropTypes.string,
  textInputProps: PropTypes.object,
  required: PropTypes.bool,
  email: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  decimal: PropTypes.bool,
  minLength: PropTypes.number,
  contentContainerStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  textInputBarStyle: PropTypes.object,
};

ShopInput.defaultProps = {};

export default ShopInput;
