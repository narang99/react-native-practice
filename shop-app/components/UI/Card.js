import React from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 5,
  }
});

const Card = (props) => {
  return (
    <View style={{...styles.cardContainer, ...props.style}}>
      {props.children}
    </View>
  );
};

Card.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node
}

export default Card;