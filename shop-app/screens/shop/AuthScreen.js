import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import Card from "../../components/UI/Card";
import { ScrollView } from "react-native-gesture-handler";
import ShopInput from "../../components/UI/ShopInput";
import ShopButton from "../../components/Shop/ShopButton";
import useFormValidator from "../../hooks/useFormValidator";
import { useDispatch } from "react-redux";
import { signup, login } from "../../store/actions/auth";
import colors from "../../constants/colors";
import { firebase } from "../../backend/firebase/firebase";

/* have to figure out google sign in. do later */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    marginTop: 5,
    height: 40,
    width: 80,
  },
  switchButtonStyle: {
    marginTop: 30,
    height: 40,
    width: 300,
    backgroundColor: colors.accent,
  },
  switchButtonTextStyle: {
    color: "black",
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  card: {
    width: "80%",
    height: "45%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  textInputContentContainerStyle: {
    width: "90%",
    margin: 10,
  },
  textInputLabelStyle: {
    fontSize: 14,
  },
  scroll: {
    flexGrow: 1,
    width: "100%",
  },
});

const authErrorToMessage = (err, isSignIn) => {
  if (isSignIn) {
    switch (err.code) {
      case "auth/invalid-email":
        return "Email address is invalid";
      case "auth/user-not-found":
        return "email or password are wrong";
      case "auth/wrong-password":
        return "email or password are wrong";
      case "auth/user-disabled":
        return "The user has been blocked";
    }
  } else {
    switch (err.code) {
      case "auth/email-already-in-use":
        return "Email is already registered as an account";
      case "auth/invalid-email":
        return "Email address is invalid";
      case "auth/operation-not-allowed":
        return "Email is disabled";
      case "auth/weak-password":
        return "Password is too weak";
    }
  }
  return "Something went wrong";
};

const AuthScreen = (props) => {
  // formState.inputs: all inputs, formState.valids: all valids, formState.isFormValid total validity
  
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formState, inputChangeHandler] = useFormValidator(
    {
      email: "",
      password: "",
    },
    {
      email: false,
      password: false,
    },
    false
  );

  useEffect(() => {
    props.navigation.setParams({
      authScreenTitle: `${isSignIn ? "Login" : "Sign Up"}`,
    });
  }, [isSignIn]);


  const dispatch = useDispatch();
  const loginOrSignupHandler = async () => {
    try {
      setIsLoading(true);
      if (formState.isFormValid) {
        if (isSignIn) {
          await dispatch(
            login(formState.inputs.email, formState.inputs.password)
          );
        } else {
          await dispatch(
            signup(formState.inputs.email, formState.inputs.password)
          );
        }
      } else {
        throw new Error("Invalid user and password field");
      }
      setIsLoading(false);
      props.navigation.navigate("Shop");
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert(
        `Could not ${isSignIn ? "login" : "sign up"}`,
        authErrorToMessage(error, isSignIn),
        [{ text: "OK" }]
      );
      setError(null);
    }
  }, [error, isSignIn]);

  const switchAuthTypeHandler = () => setIsSignIn((s) => !s);


  if(firebase.auth().currentUser) {
    props.navigation.navigate("Shop");
    return <div> </div>
  }

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <Card style={styles.card}>
        <ScrollView style={styles.scroll}>
          <ShopInput
            id="email"
            label="E-Mail"
            required
            email
            textInputProps={{
              keyboardType: "email-address",
              autoCapitalize: "none",
            }}
            errorMessage="Please enter valid e-mail adrress"
            initialValue=""
            initialValidity={false}
            onChangeText={inputChangeHandler}
            contentContainerStyle={styles.textInputContentContainerStyle}
            labelStyle={styles.textInputLabelStyle}
            textInputBarStyle={styles.textInputBarStyle}
          />
          <ShopInput
            id="password"
            label="Password"
            required
            minLength={5}
            textInputProps={{
              secureTextEntry: true,
              autoCapitalize: "none",
            }}
            errorMessage="Please enter valid password"
            initialValue=""
            initialValidity={false}
            onChangeText={inputChangeHandler}
            contentContainerStyle={styles.textInputContentContainerStyle}
            labelStyle={styles.textInputLabelStyle}
            textInputBarStyle={styles.textInputBarStyle}
          />
          <View style={styles.buttonsContainer}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <ShopButton
                buttonStyle={styles.buttonStyle}
                title={`${isSignIn ? "Login" : "Sign Up"}`}
                onPress={loginOrSignupHandler}
              />
            )}
            <ShopButton
              buttonStyle={styles.switchButtonStyle}
              textStyle={styles.switchButtonTextStyle}
              title={`Go to ${isSignIn ? "Sign up" : "Login"}`}
              onPress={switchAuthTypeHandler}
            />
          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = (config) => {
  return {
    headerTitle: config.navigation.getParam("authScreenTitle"),
  };
};

AuthScreen.propTypes = {
  navigation: PropTypes.object,
};

AuthScreen.defaultProps = {};

export default AuthScreen;