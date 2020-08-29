import React from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from '../constants/colors';

interface headerProps {
  title: string;
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "10%",
    padding: 36,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "black",
    paddingTop: 25,
  },
});

const Header: React.FC<headerProps> = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};
export default Header;
