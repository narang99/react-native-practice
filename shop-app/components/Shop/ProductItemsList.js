import React from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";
import ProductItem from "./ProductItem";
import { PropTypes } from "prop-types";

const ProductItemsList = (props) => {
  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}
      numColumns={props.numColumns}
      data={props.products}
      key={props.numColumns}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
        />
      }
      renderItem={(itemData) => (
        <ProductItem
          numColumns={props.numColumns}
          item={itemData.item}
          leftTitle={props.leftTitle}
          rightTitle={props.rightTitle}
          onSelect={props.onProductSelect}
          onLeftButtonClick={props.onLeftButtonClick}
          onRightButtonClick={props.onRightButtonClick}
          showLeft={props.showLeft}
          showRight={props.showRight}
        />
      )}
    />
  );
};

ProductItemsList.propTypes = {
  numColumns: PropTypes.number,
  products: PropTypes.array,
  containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onProductSelect: PropTypes.func,
  onLeftButtonClick: PropTypes.func,
  onRightButtonClick: PropTypes.func,
  showLeft: PropTypes.bool,
  showRight: PropTypes.bool,
  leftTitle: PropTypes.string,
  rightTitle: PropTypes.string,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
};

ProductItemsList.defaultProps = {};

export default ProductItemsList;
