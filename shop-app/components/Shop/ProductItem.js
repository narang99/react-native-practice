import React from "react";
import { PropTypes } from "prop-types";
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
  StyleSheet,
  View,
  Image,
} from "react-native";
import ShopText from "./ShopText";
import ShopButton from "./ShopButton";
import Card from "../UI/Card";

const MARGIN_HORIZONTAL = 20;
const ITEM_CONTAINER_HEIGHT = 250;
const styles = StyleSheet.create({
  loadOrError: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  touchable: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  textContainer: {
    height: "20%",
    width: "100%",
  },
  insideTouchable: {
    height: "100%",
    width: "100%",
  },
  itemContainer: {
    flexGrow: 1,
    borderRadius: 20,
    width: Dimensions.get("window").width / 2 - MARGIN_HORIZONTAL * 2,
    height: ITEM_CONTAINER_HEIGHT,
    padding: 10,
    alignItems: "center",
    marginHorizontal: MARGIN_HORIZONTAL,
    marginVertical: 5,
    backgroundColor: "white",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "15%",
    width: "90%",
  },
  imageContainer: {
    height: "75%",
    width: "100%",
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    margin: 2,
  },
});

const ProductItem = (props) => {
  const containerWidth = props.containerWidth;

  const TouchableCmp =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;
  const width =
    typeof containerWidth === "number"
      ? containerWidth / props.numColumns - 2 * MARGIN_HORIZONTAL
      : containerWidth;

  const detailsHeight = props.showLeft || props.showRight ? "80%" : "99%";

  const onSelect = () => props.onSelect(props.item);
  const onLeftButtonClick = () => props.onLeftButtonClick(props.item);
  const onRightButtonClick = () => props.onRightButtonClick(props.item);

  return (
    <Card
      style={{
        ...styles.itemContainer,
        ...{ width: width, marginHorizontal: MARGIN_HORIZONTAL },
      }}
    >
      <View style={{ height: detailsHeight, width: "100%" }}>
        <TouchableCmp
          style={styles.touchable}
          onPress={onSelect}
        >
          <View style={styles.insideTouchable}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: props.item.imageUrl }}
              />
            </View>
            <View style={styles.textContainer}>
              <ShopText type="title" textProps={{ numberOfLines: 1 }}>
                {props.item.title}
              </ShopText>
              <ShopText>${props.item.price}</ShopText>
            </View>
          </View>
        </TouchableCmp>
      </View>
      {(props.showLeft || props.showRight) && (
        <View style={styles.buttonContainer}>
          {props.showLeft && (
            <ShopButton
              title={props.leftTitle}
              onPress={onLeftButtonClick}
              textStyle={{}}
              buttonStyle={{}}
            />
          )}
          {props.showRight && (
            <ShopButton
              title={props.rightTitle}
              onPress={onRightButtonClick}
              textStyle={{}}
              buttonStyle={{}}
            />
          )}
        </View>
      )}
    </Card>
  );
};

ProductItem.propTypes = {
  numColumns: PropTypes.number,
  item: PropTypes.object,
  containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onSelect: PropTypes.func,
  onLeftButtonClick: PropTypes.func,
  onRightButtonClick: PropTypes.func,
  showLeft: PropTypes.bool,
  showRight: PropTypes.bool,
  leftTitle: PropTypes.string,
  rightTitle: PropTypes.string,
};

ProductItem.defaultProps = {
  onViewDetails: () => {},
  onAddToCart: () => {},
  screenWidth: Dimensions.get("window").width,
  numColumns: 1,
};

export default ProductItem;
