import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableNativeFeedback,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type ContainerWithImageSmallProps = {
  imageUri: string;
  imageSize: number;
  imageStyle?: ImageStyle;
  touchableStyle: ViewStyle;
  childrenContainerStyle?: ViewStyle;
  onSelect?: (id: string) => void, 
  id: string;
};

const styles = StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    margin: 5,
  },
  childrenContainer: {
    justifyContent: 'center',
  },
});

const ContainerWithImageSmall: React.FC<ContainerWithImageSmallProps> = (
  props
) => {
  const {
    imageUri,
    imageSize,
    touchableStyle,
    imageStyle,
    childrenContainerStyle,
    id
  } = props;
  const onSelect = props.onSelect ? props.onSelect : () => {};
  return (
    <TouchableOpacity style={{ ...styles.touchable, ...touchableStyle }} onPress={() => onSelect(id)}>
      <Image
        source={{ uri: imageUri }}
        style={{
          ...styles.image,
          height: imageSize,
          width: imageSize,
          borderRadius: imageSize / 2,
          ...imageStyle,
        }}
      />
      <View style={{ ...styles.childrenContainer, ...childrenContainerStyle }}>
        {props.children}
      </View>
    </TouchableOpacity>
  );
};

export default ContainerWithImageSmall;
