import React from "react";
import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const RequestHeaderLeft = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.toggleDrawer();
      }}
      activeOpacity={0.8}
    >
      <Image
        resizeMode="contain"
        source={require("../images/hamburger_white.png")}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
    padding: 7,
  },
  image: {
    width: 20,
    height: 16,
    marginLeft: 12,
  },
});

export default RequestHeaderLeft;
