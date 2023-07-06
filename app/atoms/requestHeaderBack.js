import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";

const RequestHeaderBack = ({ navigationProps }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigationProps.goBack();
      }}
      activeOpacity={0.8}
    >
      <Image
        resizeMode="contain"
        source={require("../images/go_back_arrow.png")}
        style={styles.images}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
    padding: 7,
  },
  images: {
    width: 20,
    height: 16,
    marginLeft: 12,
    tintColor: "white",
  },
});

export default RequestHeaderBack;
