import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import ShopText from "../Shop/ShopText";
import ShopButton from "../Shop/ShopButton";

const styles = StyleSheet.create({
  centeredScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const ScreenWithLoadingActivity = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadToggle, setReloadToggle] = useState(false);

  const {
    onSuccess,
    setScreenLoadingState,
    onError,
    onLoad,
    isOnLoadCleanable,
  } = props;

  useEffect(() => {
    const onSc = (result) => {
      setIsLoading(false);
      setScreenLoadingState(false);
      onSuccess(result);
    };
    const onErr = (err) => {
      setIsLoading(false);
      setScreenLoadingState(false);
      setError(err.message);
      onError(err);
    };
    setIsLoading(true);
    setScreenLoadingState(true);
    const unsubscribe = onLoad(onSc, onErr);
    return () => {
      if (isOnLoadCleanable) unsubscribe();
    };
  }, [
    reloadToggle,
    isOnLoadCleanable,
    reloadToggle,
    onSuccess,
    onError,
    onLoad,
    setScreenLoadingState,
  ]);

  const reloadScreen = () => setReloadToggle((r) => !r);

  if (isLoading) {
    return (
      <View style={styles.centeredScreen}>
        <ActivityIndicator />
      </View>
    );
  } else if (props.showErrorScreen && error !== null) {
    return (
      <View style={styles.centeredScreen}>
        <ShopText>An Error Occurred</ShopText>
        <ShopButton
          title="Retry"
          onPress={
            props.onReloadButtonPress ? props.onReloadButtonPress : reloadScreen
          }
        />
      </View>
    );
  }

  return props.children;
};

ScreenWithLoadingActivity.propTypes = {
  children: PropTypes.node,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  isOnLoadCleanable: PropTypes.bool,
  reloadToggle: PropTypes.bool,
  onReloadButtonPress: PropTypes.func,
  setScreenLoadingState: PropTypes.func,
};

ScreenWithLoadingActivity.defaultProps = {};

export default ScreenWithLoadingActivity;
